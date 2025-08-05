import Downloader from "@/components/downloader/Downloader";
import React from "react";
import VideoDetails from "../../components/VideoDetails/VideoDetails";

function page() {
  return (
    <>
      <Downloader
        title="Instagram Video Downloader"
        subtitle="Download Videos from Instagram"
      />
      <VideoDetails />
    </>
  );
}

export default page;
