import Downloader from "@/components/downloader/Downloader";
import React from "react";
import ViewersDetails from "../../components/ViewersDetails/ViewersDetails";

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
