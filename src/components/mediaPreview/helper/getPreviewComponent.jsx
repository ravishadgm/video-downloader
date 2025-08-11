"use client";

import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import CarouselPreview from "@/variants/CarouselPreview/CarouselPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";
import IGTVPreview from "@/variants/IGTVPreview/IGTVPreview";

export default function getPreviewComponent(type, props) {
  const lowerType = type?.toLowerCase();

  switch (lowerType) {
    case "reel":
      return <ReelPreview {...props} />;
    case "story":
      return <StoryPreview stories={props.data?.stories} {...props} />;
    case "photo":
    case "viewer":
      return <PhotoPostPreview {...props} />;
    case "igtv":
      return <IGTVPreview {...props} />;
    case "carousel":
    default:
      return <CarouselPreview {...props} />;
  }
}
