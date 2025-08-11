"use client";

import getPreviewComponent from "./helper/getPreviewComponent";
import styles from "./style.module.scss";

export default function MediaPreview({ mediaData, onShare }) {
  if (!mediaData) return null;

  return (
    <div className={styles.media_container}>
      {getPreviewComponent(mediaData.type, { data: mediaData, onShare })}
    </div>
  );
}
