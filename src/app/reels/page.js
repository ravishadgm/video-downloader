import Downloader from "@/components/downloader/Downloader";
import React from "react";
import DownloadDescription from "@/components/common/DownloadDescription/DownloadDescription";
import AppPromotion from "@/components/common/AppPromotion/AppPromotion";
import FaqSection from "@/components/common/Faq/Faq";
import Images from "../../../public/images/index";
import { reelsSteps, reelsFaq } from "../../dataStore/data";
import AboutProcess from "@/components/common/AboutProcess/AboutProcess";

export const metadata = {
  title: "Reels Downloader",
  description: "Download Reels from Instagram",
};


function page() {
  return (
    <>
      <Downloader
        title="Instagram Reels Downloader"
        subtitle="Download Reels from Instagram"
      />
      <AboutProcess
        image={Images.Download}
        title="Download Instagram Reels Videos"
        description="Reels Downloader, powered by InstaDl, is a user-friendly tool for downloading Instagram Reels videos. Effortlessly save Reels in mp4 format to your device. To download, just copy the Reel's link from Instagram, then paste it on InstaDl.app. This efficient service streamlines downloading Instagram Reels with just a few clicks."
        heading="How to download Instagram Reels?"
        smallDescription="Check out the three simple steps to utilize this Instagram Reels downloader. It's designed to save both time and effort."
        steps={reelsSteps}
      />

      <DownloadDescription
        heading="InstaDl Reels Downloader"
        image={Images.videoImg1}
        title="Instagram Reels Download"
        description="Instagram Reels, a novel addition to the Instagram social platform, enables the crafting of brief 15 and 30-second videos. Leveraging Instagram's superior editing capabilities, it empowers users to create and personalize videos in their distinctive style. Yet, direct downloading of Reels videos from Instagram is not permitted by the platform. For downloading Reels videos, InstaDl offers a straightforward solution. This tool facilitates the downloading of any Reels video across various devices including PCs, tablets, and smartphones (iPhone, Android)."
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram Reels downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={reelsFaq}
      />

    </>
  );
}

export default page;
