// components/mediaPreview/MediaPreview.jsx
import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import CarouselPreview from "@/variants/CarouselPreview/CarouselPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";
import IGTVPreview from "@/variants/IGTVPreview/IGTVPreview";
import ViewerPreview from "@/variants/ViewerPreview/ViewerPreview";
import styles from "./style.module.scss";

export default function MediaPreview({ mediaData, onShare }) {
  console.log(mediaData,"mediaData")
  if (!mediaData) return null;

  const { type } = mediaData;

  const renderPreview = () => {
    switch (type?.toLowerCase()) {
      case "reel":
        return <ReelPreview data={mediaData} onShare={onShare} />;

      case "story":
        return <StoryPreview stories={mediaData.stories} onShare={onShare} />;

      case "photo":
        return <PhotoPostPreview data={mediaData} onShare={onShare} />;

      case "igtv":
        return <IGTVPreview data={mediaData} onShare={onShare} />;

      case "carousel":
        return <CarouselPreview data={mediaData} onShare={onShare} />;

      case "viewer":
      default:
        return <ViewerPreview data={mediaData} onShare={onShare} />;
    }
  };

  return (
    <div className={styles.media_container}>
      {renderPreview()}
    </div>
  );
}
