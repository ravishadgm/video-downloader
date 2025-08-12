import Images from "@/utils/images";
import {
  steps,
  faqs,
  carouselSteps,
  carouselFaq,
  igtvSteps,
  igtvFaq,
  photoSteps,
  photoFaq,
  videoSteps,
  videoFaqs,
  reelsFaq,
  reelsSteps,
  storySteps,
  storyFaq,
  viewSteps,
  viewFaq,
} from "@/dataStore/faqContent";

export const categoryContent = {
  video: {
    title: "Instagram Video Downloader",
    subtitle: "Download Videos from Instagram",
    about: {
      image: Images.Download,
      title: "Download Instagram Videos",
      description:
        "Discover a world of engaging content on Instagram and bring your favorite videos closer with InstaDl. This simple online tool allows you to easily download Instagram videos anytime without restrictions. InstaDl makes it easy to download any number of videos for offline viewing again in a few simple clicks!",
      heading: "How to download Instagram Reels?",
      smallDescription:
        "Here are those three easy and quickest steps to download an Instagram video:",
      steps: videoSteps,
    },
    downloadDescription: {
      heading: "InstaDl Downloader",
      image: Images.videoImg2,
      title: "Save videos",
      description:
        "Please note that once you download the video from Instagram you are required to make it available for everyone to see it. In case you are not respecting this rule you will be restricted to download videos from private accounts. Rules are always to be respected!",
      link: "/video",
      secondImage: Images.videoImg4,
      secondTitle: "Video Downloader",
      secondDescription:
        "Furthermore, what you should know is that the downloading of the videos can be done online by just typing the Instagram video link you like. This Instagram video Downloader provides its services absolutely free of any charge; no need to get an account as to become a member.",
      secondLink: "/video",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app downloader. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: videoFaqs,
    },
  },

  carousel: {
    title: "IG Carousel Downloader",
    subtitle: "Download carousel from Instagram",
    about: {
      image: Images.Download,
      title: "Download Instagram Carousels",
      description:
        "For all Instagram users, the term  Instagram carousel is well known, and it's widely used on this social media platform. This post with multiple photos or videos, which can be viewed by swiping or clicking left, was developed to catch the attention while scrolling down on a page. Now, there is no need to wonder if one can download multiple Instagram photos from a carousel post. We made it possible for you. Try our Instagram downloader and save images from Instagram and mixed content containing photos AND videos.",
      heading: "How to download Instagram carousel posts?",
      smallDescription:
        "Instagram carousel posts can now be downloaded and saved fast and easily. In just three steps, you will get the joy of delighting your eyes while watching your favorite photos",
      steps: carouselSteps,
    },
    downloadDescription: {
      heading: "Carousel Downloader",
      headingDescription:
        "Instagram is a social media platform that allows users to post stories and share them with their followers. You can also create stories and highlights similar to Snapchat stories. Our website allows you to download Instagram story with one click!",
      image: Images.videoImg3,
      title: "Album Downloader",
      description:
        "It has always been challenging to download an Instagram carousel post. You must paste the link of the Instagram carousel post without searching the source code or photo link. It is 100% safe and secure, as all photos AND videos are downloaded from the Instagram server.",
      link: "/carousel",
      secondImage: Images.DownloadTwo,
      secondTitle: "Download multiple photos",
      secondDescription:
        "The online Instagram multiple photos downloading tool will help anyone who wants free photo downloading. Even the largest pictures can now be saved in high quality and originality. The HD images and videos from IG are available by using this Instagram downloader.",
      secondLink: "/carousel",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app downloader. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: carouselFaq,
    },
  },
  igtv: {
    title: "IGTV Downloader",
    subtitle: "Instagram IGTV Video Download",
    about: {
      image: Images.Download,
      title: "Download Instagram IGTV Videos",
      description:
        "Discover a seamless, speedy, and efficient way to download Instagram videos using our IGTV Video Downloader. As you browse through Instagram, you might stumble upon an IGTV video that catches your eye. Now, saving it to your device is as simple as a breeze. Just copy the video URL, paste it into the designated field on the InstaDl page, and hit the Download button. Voila! Your video is ready for offline viewing.",
      heading: "How to download IGTV Instagram?",
      smallDescription:
        "To download IGTV video follow a few easy steps, described below.",
      steps: igtvSteps,
    },
    downloadDescription: {
      heading: "Download IGTV Videos",
      headingDescription:
        "Instagram is a social media platform that allows users to post stories and share them with their followers. You can also create stories and highlights similar to Snapchat stories. Our website allows you to download Instagram story with one click!",
      image: Images.videoImg2,
      title: "IGTV Downloader",
      description:
        "After clicking the Download button, you want to check if the video has been downloaded. So, no matter what device you use, a smartphone, a tablet, a Mac, or a PC, the IGTV video will be downloaded in the default Download folder. There should be no compatibility problems.",
      link: "/igtv",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app IGTV downloader. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: igtvFaq,
    },
  },
  photo: {
    title: "Instagram Photo Downloader",
    subtitle: "Download Photos from Instagram",
    about: {
      image: Images.Download,
      title: "Download Instagram Photos",
      description:
        "In today's digital age, Instagram has become a hub for sharing life's moments through photographs, covering a wide range of interests. Sometimes you want to save a photo on your device. This is where InstaDl comes in, making it easy to download and save any photo you like from Instagram. Whether you're using a PC, Mac, Android, or iPhone, downloading your favorite Instagram photos is just a click away.",
      heading: "How to download Instagram photos?",
      smallDescription:
        "See below the three easy steps to use this Instagram picture downloader. It saves time and energy.",
      steps: photoSteps,
    },
    downloadDescription: {
      heading: "InstaDl Downloader",
      image: Images.DownloadTwo,
      title: "Photos Downloader",
      description:
        "Downloading multiple Instagram photos on whatever device you use, such as a smartphone or PC, is now made possible with the InstaDl downloader. It is an online tool provided for free and without a subscription. Just copy the post link where the photo is and paste it onto the appropriate field. Please note that multiple photo downloading is also possible with our InstaDl photo downloader. There is no limit on the number of photos you want to download.",
      link: "/photo",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram photo downloader. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: photoFaq,
    },
  },
  reels: {
    title: "Instagram Reels Downloader",
    subtitle: "Download Reels from Instagram",
    about: {
      image: Images.Download,
      title: "Download Instagram Reels Videos",
      description:
        "Reels Downloader, powered by InstaDl, is a user-friendly tool for downloading Instagram Reels videos. Effortlessly save Reels in mp4 format to your device. To download, just copy the Reel's link from Instagram, then paste it on InstaDl.app. This efficient service streamlines downloading Instagram Reels with just a few clicks.",
      heading: "How to download Instagram Reels?",
      smallDescription:
        "Check out the three simple steps to utilize this Instagram Reels downloader. It's designed to save both time and effort.",
      steps: reelsSteps,
    },
    downloadDescription: {
      heading: "InstaDl Reels Downloader",
      image: Images.videoImg1,
      title: "Instagram Reels Download",
      description:
        "Instagram Reels, a novel addition to the Instagram social platform, enables the crafting of brief 15 and 30-second videos. Leveraging Instagram's superior editing capabilities, it empowers users to create and personalize videos in their distinctive style. Yet, direct downloading of Reels videos from Instagram is not permitted by the platform. For downloading Reels videos, InstaDl offers a straightforward solution. This tool facilitates the downloading of any Reels video across various devices including PCs, tablets, and smartphones (iPhone, Android).",
      link: "/reels",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram Reels downloader. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: reelsFaq,
    },
  },
  story: {
    title: "Instagram Story Downloader",
    subtitle: "Download your Instagram story and highlights easily!",
    about: {
      image: Images.Download,
      title: "Instagram Story saver",
      description:
        "Instagram Story Saver by InstaDl is your go-to tool for effortlessly downloading any Instagram story straight to your device while remaining completely anonymous. Whether you wish to re-upload, repost, or simply save your favorite stories to your own media library for later viewing with friends, InstaDl makes it a breeze. With no limitations, you can keep the memories alive and share the laughter once more! InstaDl's Insta Story Saver is designed for both casual browsers and avid Instagram users, ensuring a seamless experience in preserving the fleeting moments shared on Instagram stories. Plus, our tool is accessible right from your browser - no need for any additional software installation! Embrace the ease and efficiency of InstaDl Instagram Story Saver and never miss out on any story that catches your eye.",
      heading: "How to download Story Instagram?",
      smallDescription:
        "Only three easy and quickest steps to download an Instagram Story",
      steps: storySteps,
    },
    downloadDescription: {
      heading: "Instagram Story Download",
      headingDescription:
        "Instagram is a social media platform that allows users to post stories and share them with their followers. You can also create stories and highlights similar to Snapchat stories. Our website allows you to download Instagram story with one click!",
      image: Images.videoImg2,
      title: "Story Saver",
      description:
        "Please note that to save a Story from Instagram, you must be confident that it is viewable to the public. Follow this rule to be able to download stories or highlights from your accounts. You always have to follow the rules!",
      link: "/story",
      secondImage: Images.videoImg1,
      secondTitle: "Story Downloader",
      secondDescription:
        "Also, you can download the Story online by simply typing the Instagram Story link you like. This Instagram Story saver is free of charge; there is no need to get an account to become a member. It is anonymous.",
      secondLink: "/story",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram story downloader. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: storyFaq,
    },
  },
  viewer: {
    title: "Instagram Stories Viewer",
    subtitle: "Anonymously Instagram Story Viewer",
    about: {
      image: Images.Download,
      title: "Instagram Stories Viewer",
      description:
        "InstaDl Instagram Stories Viewer is a complimentary tool that enables anonymous viewing of Instagram stories from public profiles without the need for Instagram user authentication. The platform offers a range of free features, allowing you to discreetly view stories without any extra steps, other than entering the user's Instagram handle.",
      heading: "How to use Instagram Story Viewer?",
      smallDescription:
        "See below the three easy steps to use this Instagram Story Viewer. It saves time and energy.",
      steps: viewSteps,
    },
    downloadDescription: {
      heading: "InstaDl Story Viewer",
      headingDescription:
        "An Instagram viewer is a third-party website or app that allows you to view Instagram posts, stories, and profiles anonymously without having an Instagram account or logging into one.",
      image: Images.videoImg1,
      title: "Instagram Stories Viewer",
      description:
        "Currently, Instagram users do not have the option to download or save stories, highlights, or reels from Instagram directly. However, thanks to the Instagram Stories viewer, users now have this option. Additionally, the InstaDl Instagram Highlights viewer allows you to anonymously view public user stories regardless of the device you are using.",
      link: "/viewer",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram viewer. If you can't find the answer to your question, feel free to ask through email on our contact page.",
      image: Images.Download,
      items: viewFaq,
    },
  }
};
