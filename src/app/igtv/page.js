import Downloader from "@/components/downloader/Downloader";
import React from "react";
import IgTvDetails from "../../components/IgTvDetails/IgTvDetails";

function page() {
  return (
    <>
      <Downloader
        title="IGTV Downloader"
        subtitle="Instagram IGTV Video Download"
      />
      <IgTvDetails />
    </>
  );
}

export default page;
