import Downloader from "@/components/downloader/Downloader";
import React from "react";
import PhotoDetails from "@/components/PhotoDetails/PhotoDetails";

function page() {
  return (
    <>
      <Downloader
        title="Instagram Photo Downloader"
        subtitle="Download Photos from Instagram"
      />
      <PhotoDetails />
    </>
  );
}

export default page;
