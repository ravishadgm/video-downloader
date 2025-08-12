import React from "react";
import Downloader from "@/components/downloader/Downloader";
import WhyUs from "@/components/WhyUs/WhyUs";
import { steps, faqs } from "@/dataStore/faqContent";
import AboutProcess from "@/common/AboutProcess/AboutProcess";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import FaqSection from "@/common/Faq/Faq";
import Images from "@/utils/images";

export default function Page() {
  return (
    <>
    
      <Downloader />
      <AboutProcess
        image={Images.Download}
        title="Instagram Videos and Photos Download"
        description="InstaDl is an online web tool that helps you download Instagram Videos, Photos, Reels, and IGTV. InstaDl.app is designed to be easy to use on any device, such as a mobile phone, tablet, or computer."
        heading="How to download from Instagram?"
        smallDescription="You must follow these three easy steps to download video, reels, and photo from Instagram (IG, Insta). Follow the simple steps below."
        steps={steps}
      />
      <WhyUs />
      <DownloadDescription
        heading="InstaDl.app features"
        headingDescription="With InstaDl you can download any type of content from Instagram. Our service has an IG video downloader, Reels, IGTV, photo or carousel."
        image={Images.videoImg2}
        title="Video Downloader"
        description="InstaDl.app supports Instagram video download for singular videos and multiple videos from carousels. InstaDl is created to enable you to download IG videos from your personal page."
        secondImage={Images.DownloadTwo}
        secondTitle="Photos Downloader"
        secondDescription="Instagram photo download provided by InstaDl.app is a great tool for saving images from Instagram posts. With InstaDl, you can download a single post image and multiple Instagram photos (carousel)."
      />

      <DownloadDescription
        image={Images.videoImg1}
        title="Reels Downloader"
        description="Reels is a new video format that clones the principle of TikTok. Instagram Reels download with the help of InstaDl. Our Instagram Reels downloader can help you to save your favorite Reels videos."
        secondImage={Images.videoImg2}
        secondTitle="IGTV Downloader"
        secondDescription="IGTV is a long video type. If you can’t watch it now, you can download IGTV videos to your device to be sure that you can return to watching later, without the need to be online or in case the IGTV can be deleted."
      />

      <DownloadDescription
        image={Images.videoImg3}
        title="Carousel / Album Downloader"
        description="Carousel, also known as Album or Gallery posts type with multiple photos, videos, or mixed content. If you need to download multiple photos from Instagram, the InstaDl.app is the best to download gallery."
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={faqs}
      />
    </>
  );
}
