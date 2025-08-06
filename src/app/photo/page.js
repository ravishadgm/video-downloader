import Downloader from "@/components/downloader/Downloader";
import React from "react";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import FaqSection from "@/common/Faq/Faq";
import Images from "../../../public/images/index";
import { photoSteps, photoFaq } from "../../dataStore/data";
import AboutProcess from "@/common/AboutProcess/AboutProcess";

export const metadata = {
  title: "Instagram Photo Downloader",
  description: "Download Instagram photos in high resolution.",
};
function page() {
  return (
    <>
      <Downloader
        title="Instagram Photo Downloader"
        subtitle="Download Photos from Instagram"
      />

      <AboutProcess
        image={Images.Download}
        title="Download Instagram Photos"
        description="In today's digital age, Instagram has become a hub for sharing life's moments through photographs, covering a wide range of interests. Sometimes you want to save a photo on your device. This is where InstaDl comes in, making it easy to download and save any photo you like from Instagram. Whether you're using a PC, Mac, Android, or iPhone, downloading your favorite Instagram photos is just a click away."
        heading="How to download Instagram photos?"
        smallDescription="See below the three easy steps to use this Instagram picture downloader. It saves time and energy."
        steps={photoSteps}
      />

      <DownloadDescription
        heading="InstaDl Downloader"
        image={Images.DownloadTwo}
        title="Photos Downloader"
        description="Downloading multiple Instagram photos on whatever device you use, such as a smartphone or PC, is now made possible with the InstaDl downloader. It is an online tool provided for free and without a subscription. Just copy the post link where the photo is and paste it onto the appropriate field. Please note that multiple photo downloading is also possible with our InstaDl photo downloader. There is no limit on the number of photos you want to download."
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ provides information on frequent questions or concerns about the InstaDl.app instagram photo downloader. If you can't find the answer to your question, feel free to ask through email on our contact page."
        image={Images.Download}
        faqs={photoFaq}
      />

    </>
  );
}

export default page;
