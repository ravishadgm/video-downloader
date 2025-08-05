import Downloader from "@/components/downloader/Downloader";
import React from "react";
import ReelsDetails from "@/components/ReelsDetails/ReelsDetails";

function page() {
  return (
    <>
      <Downloader
        title="Instagram Reels Downloader"
        subtitle="Download Reels from Instagram"
      />
      <ReelsDetails />
    </>
  );
}

export default page;
