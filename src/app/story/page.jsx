import Downloader from "@/components/downloader/Downloader";
import React from "react";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import FaqSection from "@/common/Faq/Faq";
import Images from "../../../public/images/index";
import { storySteps, storyFaq } from "../../dataStore/data";
import AboutProcess from "@/common/AboutProcess/AboutProcess";

export const metadata = {
  title: "Instagram Story Downloader",
  description: "Download Instagram stories anonymously and easily.",
};

export default function page() {
  return (
    <>
      <Downloader
        title="Story Saver"
        subtitle="Download your Instagram story and highlights easily!"
      />

      <AboutProcess
        image={Images.Download}
        title="Instagram Story saver"
        description="Instagram Story Saver by InstaDl is your go-to tool for effortlessly downloading any Instagram story straight to your device while remaining completely anonymous. Whether you wish to re-upload, repost, or simply save your favorite stories to your own media library for later viewing with friends, InstaDl makes it a breeze. With no limitations, you can keep the memories alive and share the laughter once more! InstaDl's Insta Story Saver is designed for both casual browsers and avid Instagram users, ensuring a seamless experience in preserving the fleeting moments shared on Instagram stories. Plus, our tool is accessible right from your browser - no need for any additional software installation! Embrace the ease and efficiency of InstaDl Instagram Story Saver and never miss out on any story that catches your eye."
        heading="How to download Story Instagram?"
        smallDescription="Only three easy and quickest steps to download an Instagram Story"
        steps={storySteps}
      />

      <DownloadDescription
        heading="Instagram Story Download"
        headingDescription="Instagram is a social media platform that allows users to post stories and share them with their followers. You can also create stories and highlights similar to Snapchat stories. Our website allows you to download Instagram story with one click!"
        image={Images.videoImg2}
        title="Story Saver"
        description="Please note that to save a Story from Instagram, you must be confident that it is viewable to the public. Follow this rule to be able to download stories or highlights from your accounts. You always have to follow the rules!"
        secondImage={Images.videoImg1}
        secondTitle="Story Downloader"
        secondDescription="Also, you can download the Story online by simply typing the Instagram Story link you like. This Instagram Story saver is free of charge; there is no need to get an account to become a member. It is anonymous."
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram story downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={storyFaq}
      />

    </>
  );
}

