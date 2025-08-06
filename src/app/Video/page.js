import Downloader from "@/components/downloader/Downloader";
import React from "react";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import FaqSection from "@/common/Faq/Faq";
import Images from "../../../public/images/index";
import { videoSteps, videoFaqs } from "../../dataStore/data";
import AboutProcess from "@/common/AboutProcess/AboutProcess";

export const metadata = {
  title: "Instagram Video Downloader",
  description: "Download Instagram videos in high quality for free.",
};

function page() {
  return (
    <>
      <Downloader
        title="Instagram Video Downloader"
        subtitle="Download Videos from Instagram"
      />

      <AboutProcess
        image={Images.Download}
        title="Download Instagram Videos"
        description="Discover a world of engaging content on Instagram and bring your favorite videos closer with InstaDl. This simple online tool allows you to easily download Instagram videos anytime without restrictions. InstaDl makes it easy to download any number of videos for offline viewing again in a few simple clicks!"
        heading="How to download Instagram Reels?"
        smallDescription="Here are those three easy and quickest steps to download an Instagram video:"
        steps={videoSteps}
      />

      <DownloadDescription
        heading="InstaDl Downloader"
        image={Images.videoImg2}
        title="Save videos"
        description="Please note that once you download the video from Instagram you are required to make it available for everyone to see it. In case you are not respecting this rule you will be restricted to download videos from private accounts. Rules are always to be respected!"
        secondImage={Images.videoImg4}
        secondTitle="Video Downloader"
        secondDescription="Furthermore, what you should know is that the downloading of the videos can be done online by just typing the Instagram video link you like. This Instagram video Downloader provides its services absolutely free of any charge; no need to get an account as to become a member."
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={videoFaqs}
      />

    </>
  );
}

export default page;
