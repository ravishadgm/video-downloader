import Downloader from "@/components/downloader/Downloader";
import React from "react";
import StoryDetails from "@/components/StoryDetails/StoryDetails"
export const metadata = {
  title: "Instagram Story Downloader",
  description: "Download Instagram stories anonymously and easily.",
};
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
