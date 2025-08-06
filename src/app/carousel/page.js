import Downloader from "@/components/downloader/Downloader";
import React from "react";
import DownloadDescription from "@/components/common/DownloadDescription/DownloadDescription";
import AppPromotion from "@/components/common/AppPromotion/AppPromotion";
import FaqSection from "@/components/common/Faq/Faq";
import Images from "../../../public/images/index";
import { carouselSteps, carouselFaq } from "../../dataStore/data";
import AboutProcess from "@/components/common/AboutProcess/AboutProcess";

export const metadata = {
  title: "IG Carousel Downloader",
  description: "Download carousel from Instagram",
};
function page() {
  return (
    <>
      <Downloader
        title="IG Carousel Downloader"
        subtitle="Download carousel from Instagram"
      />
      <AboutProcess
        image={Images.Download}
        title="Download Instagram Carousels"
        description="For all Instagram users, the term  Instagram carousel is well known, and it's widely used on this social media platform. This post with multiple photos or videos, which can be viewed by swiping or clicking left, was developed to catch the attention while scrolling down on a page. Now, there is no need to wonder if one can download multiple Instagram photos from a carousel post. We made it possible for you. Try our Instagram downloader and save images from Instagram and mixed content containing photos AND videos."
        heading="How to download Instagram carousel posts?"
        smallDescription="Instagram carousel posts can now be downloaded and saved fast and easily. In just three steps, you will get the joy of delighting your eyes while watching your favorite photos"
        steps={carouselSteps}
      />

      <AppPromotion />
      <DownloadDescription
        heading="Carousel Downloader"
        headingDescription="Instagram is a social media platform that allows users to post stories and share them with their followers. You can also create stories and highlights similar to Snapchat stories. Our website allows you to download Instagram story with one click!"
        image={Images.videoImg3}
        title="Album Downloader"
        description="It has always been challenging to download an Instagram carousel post. You must paste the link of the Instagram carousel post without searching the source code or photo link. It is 100% safe and secure, as all photos AND videos are downloaded from the Instagram server."
        secondImage={Images.DownloadTwo}
        secondTitle="Download multiple photos"
        secondDescription="The online Instagram multiple photos downloading tool will help anyone who wants free photo downloading. Even the largest pictures can now be saved in high quality and originality. The HD images and videos from IG are available by using this Instagram downloader."
      />

      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={carouselFaq}
      />
    </>
  );
}

export default page;
