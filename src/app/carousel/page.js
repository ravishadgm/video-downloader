import Downloader from "@/components/downloader/Downloader";
import React from "react";
import CarouselDetails from "../../components/CarouselDetails/CarouselDetails";
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
      <CarouselDetails />
    </>
  );
}

export default page;
