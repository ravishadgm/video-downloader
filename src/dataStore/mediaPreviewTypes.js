import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
  reel: (props) => <ReelPreview {...props} />,
  story: (props) => <StoryPreview stories={props.data?.medias} {...props} />,
  photo: (props) => <PhotoPostPreview {...props} />,
  viewer: (props) => <PhotoPostPreview {...props} />,
  igtv: (props) => <PhotoPostPreview {...props} />,
  carousel: (props) => <PhotoPostPreview {...props} />,
};
