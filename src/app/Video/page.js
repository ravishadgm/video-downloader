import Downloader from "@/components/downloader/Downloader";
import React from "react";
import VideoDetails from "../../components/VideoDetails/VideoDetails";
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
      <VideoDetails />
    </>
  );
}

export default page;
