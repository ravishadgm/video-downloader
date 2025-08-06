import Downloader from "@/components/downloader/Downloader";
import React from "react";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import FaqSection from "@/common/Faq/Faq";
import Images from "../../../public/images/index";
import { viewSteps, viewFaq } from "../../dataStore/data";
import AboutProcess from "@/common/AboutProcess/AboutProcess";

export const metadata = {
  title: "Instagram Video Downloader",
  description: "Download Videos from Instagram",
};

export default function page() {
  return (
    <>
      <Downloader
        title="Instagram Stories Viewer"
        subtitle="Anonymously Instagram Story Viewer"
      />
      <AboutProcess
        image={Images.Download}
        title="Instagram Stories Viewer"
        description="InstaDl Instagram Stories Viewer is a complimentary tool that enables anonymous viewing of Instagram stories from public profiles without the need for Instagram user authentication. The platform offers a range of free features, allowing you to discreetly view stories without any extra steps, other than entering the user's Instagram handle."
        heading="How to use Instagram Story Viewer?"
        smallDescription="See below the three easy steps to use this Instagram Story Viewer. It saves time and energy."
        steps={viewSteps}
      />

      <DownloadDescription
        heading="InstaDl Story Viewer"
        headingDescription="An Instagram viewer is a third-party website or app that allows you to view Instagram posts, stories, and profiles anonymously without having an Instagram account or logging into one."
        image={Images.videoImg1}
        title="Instagram Stories Viewer"
        description="Currently, Instagram users do not have the option to download or save stories, highlights, or reels from Instagram directly. However, thanks to the Instagram Stories viewer, users now have this option. Additionally, the InstaDl Instagram Highlights viewer allows you to anonymously view public user stories regardless of the device you are using."
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram viewer. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={viewFaq}
      />
    </>
  );
}
