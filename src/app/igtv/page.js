import Downloader from "@/components/downloader/Downloader";
import React from "react";
import IgTvDetails from "../../components/IgTvDetails/IgTvDetails";

export const metadata = {
  title: "IGTV Downloader",
  description: "Instagram IGTV Video Download",
};

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
