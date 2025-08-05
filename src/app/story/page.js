import Downloader from "@/components/downloader/Downloader";
import React from "react";
import StoryDetails from "@/components/StoryDetails/StoryDetails"

function page() {
  return (
    <>
      <Downloader
        title="Story Saver"
        subtitle="Download your Instagram story and highlights easily!"
      />
      <StoryDetails />
    </>
  );
}

export default page;
