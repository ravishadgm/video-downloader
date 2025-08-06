import Downloader from "@/components/downloader/Downloader";
import React from "react";
import ViewersDetails from "../../components/ViewersDetails/ViewersDetails";

export const metadata = {
  title: "Instagram Video Downloader",
  description: "Download Videos from Instagram",
};



function page() {
  return (
    <>
      <Downloader
        title="Instagram Stories Viewer"
        subtitle="Anonymously Instagram Story Viewer"
      />
      <ViewersDetails />
    </>
  );
}

export default page;
