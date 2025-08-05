import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const MOBILE_CONFIG = {
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  viewport: {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    isLandscape: false,
  },
};

export async function fetchStoryViaPuppeteer(storyUrl) {
  let browser;
  
  try {
    console.log("🚀 Starting Instagram story extraction...");
    
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--disable-blink-features=AutomationControlled",
        "--exclude-switches=enable-automation",
        "--disable-extensions",
        "--disable-plugins",
        "--disable-images", // Speed up loading
        "--disable-javascript-harmony-shipping",
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
        "--disable-backgrounding-occluded-windows",
        "--disable-ipc-flooding-protection",
        "--enable-features=NetworkService,NetworkServiceLogging",
        "--force-color-profile=srgb",
        "--metrics-recording-only",
        "--use-mock-keychain"
      ],
      defaultViewport: null
    });

    const page = await browser.newPage();

    // Advanced stealth configuration
    await setupStealth(page);

    // Set up network interception for media URLs
    const interceptedMedia = [];
    await setupNetworkInterception(page, interceptedMedia);

    // Configure mobile emulation
    await page.setUserAgent(MOBILE_CONFIG.userAgent);
    await page.setViewport(MOBILE_CONFIG.viewport);

    // Set additional headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    });

    console.log("🔐 Attempting Instagram login...");
    
    // Enhanced login process
    const loginSuccess = await performInstagramLogin(page);
    
    if (!loginSuccess) {
      throw new Error("Failed to login to Instagram after all attempts");
    }

    console.log("✅ Login successful! Navigating to story...");

    // Navigate to story
    await navigateToStory(page, storyUrl);

    // Extract story media
    const extractedMedia = await extractStoryMedia(page, interceptedMedia);

    if (extractedMedia.length === 0) {
      throw new Error("No story media found");
    }

    console.log(`📦 Found ${extractedMedia.length} media items, downloading...`);

    // Download media
    const downloadedMedia = await downloadMedia(page, extractedMedia);

    console.log(`✅ Successfully downloaded ${downloadedMedia.length} items`);

    return downloadedMedia.length === 1 ? downloadedMedia[0] : downloadedMedia;

  } catch (error) {
    console.error("💥 Error:", error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Advanced stealth configuration
async function setupStealth(page) {
  await page.evaluateOnNewDocument(() => {
    // Remove webdriver property
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });

    // Override plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });

    // Override languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });

    // Override permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );

    // Mock chrome object
    window.chrome = {
      runtime: {},
    };

    // Override screen properties
    Object.defineProperty(screen, 'availHeight', { value: 812 });
    Object.defineProperty(screen, 'availWidth', { value: 375 });
  });
}

// Network interception setup
async function setupNetworkInterception(page, interceptedMedia) {
  await page.setRequestInterception(true);
  
  page.on('request', (request) => {
    const url = request.url();
    const resourceType = request.resourceType();

    // Block unnecessary resources to speed up
    if (resourceType === 'stylesheet' || resourceType === 'font') {
      request.abort();
      return;
    }

    // Intercept story media
    if (url.includes('scontent') && 
        !url.includes('profile_pic') && 
        !url.includes('s150x150') &&
        !url.includes('s40x40') &&
        (url.includes('.mp4') || url.includes('.jpg') || url.includes('&_nc_'))) {
      
      console.log('🎯 Story media intercepted:', url.substring(0, 80) + '...');
      interceptedMedia.push({
        url: url,
        type: url.includes('.mp4') ? 'video' : 'image',
        timestamp: Date.now()
      });
    }

    request.continue();
  });
}

// Enhanced Instagram login
async function performInstagramLogin(page) {
  const maxAttempts = 3;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`🔄 Login attempt ${attempt}/${maxAttempts}...`);
      
      // Navigate to login page
      await page.goto("https://www.instagram.com/accounts/login/", {
        waitUntil: "domcontentloaded",
        timeout: 30000
      });

      // Wait for page to stabilize
      await delay(5000);

      // Wait for login form
      await page.waitForSelector('input[name="username"]', { timeout: 15000 });
      await delay(2000);

      // Clear and fill username
      await page.click('input[name="username"]');
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.type('input[name="username"]', process.env.IG_USERNAME, { delay: 100 });

      await delay(1000);

      // Clear and fill password
      await page.click('input[name="password"]');
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.type('input[name="password"]', process.env.IG_PASSWORD, { delay: 100 });

      await delay(2000);

      // Try multiple login button strategies
      const loginSuccess = await tryLoginStrategies(page);
      
      if (!loginSuccess) {
        console.log(`❌ Login attempt ${attempt} failed: button not found`);
        await page.screenshot({ path: `./login-attempt-${attempt}.png`, fullPage: true });
        continue;
      }

      // Wait for login result
      const loginResult = await waitForLoginResult(page);
      
      if (loginResult.success) {
        console.log("✅ Login successful!");
        await handlePostLoginPopups(page);
        return true;
      } else {
        console.log(`❌ Login attempt ${attempt} failed:`, loginResult.error);
        if (loginResult.error.includes('challenge') || loginResult.error.includes('verification')) {
          throw new Error(`Instagram requires verification: ${loginResult.error}`);
        }
      }

    } catch (error) {
      console.log(`❌ Login attempt ${attempt} error:`, error.message);
      if (attempt === maxAttempts) {
        throw error;
      }
      await delay(5000);
    }
  }

  return false;
}

// Try multiple login button strategies
async function tryLoginStrategies(page) {
  const strategies = [
    // Strategy 1: Submit button
    async () => {
      const submitBtn = await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        return true;
      }
      return false;
    },

    // Strategy 2: Text-based button search
    async () => {
      const button = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(btn => 
          btn.innerText && 
          (btn.innerText.toLowerCase().includes('log in') || 
           btn.innerText.toLowerCase().includes('sign in'))
        );
      });
      
      if (button._remoteObject.objectId) {
        await button.click();
        return true;
      }
      return false;
    },

    // Strategy 3: Form submission
    async () => {
      const form = await page.$('form');
      if (form) {
        await page.evaluate(() => {
          const form = document.querySelector('form');
          if (form) form.submit();
        });
        return true;
      }
      return false;
    },

    // Strategy 4: Enter key
    async () => {
      await page.keyboard.press('Enter');
      return true;
    }
  ];

  for (let i = 0; i < strategies.length; i++) {
    try {
      console.log(`🔄 Trying login strategy ${i + 1}...`);
      const success = await strategies[i]();
      if (success) {
        console.log(`✅ Login strategy ${i + 1} executed`);
        return true;
      }
    } catch (error) {
      console.log(`❌ Login strategy ${i + 1} failed:`, error.message);
    }
  }

  return false;
}

// Wait for login result
async function waitForLoginResult(page) {
  try {
    // Wait for either navigation or error
    await Promise.race([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15000 }),
      page.waitForSelector('#slfErrorAlert', { timeout: 15000 }),
      page.waitForSelector('[role="alert"]', { timeout: 15000 })
    ]);

    await delay(3000);

    const currentUrl = page.url();
    
    // Check for error messages
    const errorElement = await page.$('#slfErrorAlert, [role="alert"]');
    if (errorElement) {
      const errorText = await page.evaluate(el => el.textContent, errorElement);
      return { success: false, error: errorText };
    }

    // Check if redirected away from login
    if (!currentUrl.includes('/accounts/login/')) {
      return { success: true };
    }

    // Still on login page
    return { success: false, error: 'Still on login page' };

  } catch (error) {
    // Timeout - check current state
    const currentUrl = page.url();
    if (!currentUrl.includes('/accounts/login/')) {
      return { success: true };
    }
    return { success: false, error: 'Login timeout' };
  }
}

// Handle post-login popups
async function handlePostLoginPopups(page) {
  await delay(3000);
  
  const popupTexts = [
    'not now',
    'save info',
    'turn on notifications',
    'add to home screen',
    'not interested'
  ];

  for (let i = 0; i < 3; i++) { // Try up to 3 popups
    try {
      const buttons = await page.$$('button');
      let found = false;
      
      for (let button of buttons) {
        const text = await page.evaluate(el => el.textContent?.toLowerCase() || '', button);
        
        if (popupTexts.some(popup => text.includes(popup))) {
          await button.click();
          await delay(2000);
          console.log(`✅ Dismissed popup: ${text}`);
          found = true;
          break;
        }
      }
      
      if (!found) break;
      
    } catch (error) {
      break;
    }
  }
}

// Navigate to story
async function navigateToStory(page, storyUrl) {
  console.log("📖 Navigating to story:", storyUrl);
  
  await page.goto(storyUrl, {
    waitUntil: "domcontentloaded",
    timeout: 30000
  });

  await delay(8000); // Wait for story to load

  // Try to activate story
  try {
    await page.click('body');
    await delay(2000);
    await page.keyboard.press('Space');
    await delay(3000);
  } catch (error) {
    console.log("⚠️ Story activation failed:", error.message);
  }

  // Take debug screenshot
  await page.screenshot({ 
    path: './story-loaded.png',
    fullPage: true 
  });
}

// Extract story media
async function extractStoryMedia(page, interceptedMedia) {
  console.log("🔍 Extracting story media...");
  
  // First, try DOM extraction
  const domMedia = await page.evaluate(() => {
    const media = [];
    
    // Check videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      const src = video.src || video.currentSrc;
      if (src && src.includes('scontent') && !src.includes('profile') && 
          video.offsetWidth > 200 && video.offsetHeight > 200) {
        media.push({ type: 'video', url: src, source: 'dom' });
      }
    });

    // Check images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src && img.src.includes('scontent') && 
          !img.src.includes('profile_pic') && 
          !img.src.includes('s150x150') &&
          img.offsetWidth > 300 && img.offsetHeight > 400) {
        media.push({ type: 'image', url: img.src, source: 'dom' });
      }
    });

    return media;
  });

  console.log(`📱 DOM extraction found: ${domMedia.length} items`);
  console.log(`🌐 Network interception found: ${interceptedMedia.length} items`);

  // Combine and deduplicate
  const allMedia = [...domMedia, ...interceptedMedia];
  const uniqueMedia = allMedia.filter((media, index, self) => 
    index === self.findIndex(m => m.url === media.url)
  );

  return uniqueMedia;
}

// Download media
async function downloadMedia(page, mediaList) {
  const downloadedMedia = [];
  
  for (let i = 0; i < mediaList.length; i++) {
    const media = mediaList[i];
    console.log(`⬇️ Downloading ${i + 1}/${mediaList.length}: ${media.type}`);
    
    try {
      // Download using fetch in page context
      const mediaBuffer = await page.evaluate(async (url) => {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15',
            'Referer': 'https://www.instagram.com/'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        return Array.from(new Uint8Array(arrayBuffer));
      }, media.url);

      const buffer = Buffer.from(mediaBuffer);
      const extension = media.type === 'video' ? 'mp4' : 'jpg';
      const fileName = `story_${Date.now()}_${i + 1}.${extension}`;
      
      // Ensure downloads directory exists
      const downloadsDir = path.resolve("./downloads");
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }
      
      const filePath = path.join(downloadsDir, fileName);
      fs.writeFileSync(filePath, buffer);

      downloadedMedia.push({
        type: "story",
        mediaUrl: media.url,
        fileName,
        filePath,
        base64: buffer.toString("base64"),
        mimeType: extension === "mp4" ? "video/mp4" : "image/jpeg",
        size: buffer.length
      });

      console.log(`✅ Downloaded: ${fileName} (${(buffer.length / 1024).toFixed(1)}KB)`);

    } catch (error) {
      console.error(`❌ Failed to download media ${i + 1}:`, error.message);
    }
  }
  
  return downloadedMedia;
}

// Fallback function
export async function fetchStoryWithFallbacks(storyUrl) {
  try {
    return await fetchStoryViaPuppeteer(storyUrl);
  } catch (error) {
    console.error("❌ Story extraction failed:", error.message);
    throw error;
  }
}
