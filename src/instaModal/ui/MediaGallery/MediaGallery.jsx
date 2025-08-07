"use client";

import styles from "./MediaGallery.module.scss";
import { isVideo } from "@/utils/constHelper";
import MediaImage from "@/instaModal/ui/MediaImage/MediaImage";
import MediaVideo from "@/instaModal/ui/MediaVideo/MediaVideo";
import { handleShare } from "@/instaModal/hooks/share/share";
import { handleDownload } from "@/instaModal/hooks/download/download";

export default function MediaGallery({ mediaUrls = [] }) {
  return (
    <div className={styles.galleryGrid}>
      {mediaUrls.filter(Boolean).map((url, idx) => (
        <div key={idx} className={styles.mediaItem}>
          <div className={styles.mediaWrapper}>
            {isVideo(url) ? (
              <MediaVideo src={url} />
            ) : (
              <MediaImage src={url} alt={`Media ${idx + 1}`} />
            )}
          </div>
          <div className={styles.actionButtons}>
            <button onClick={() => handleShare(url)}>Share</button>
            <button onClick={() => handleDownload(url)}>Download</button>
          </div>
        </div>
      ))}
    </div>
  );
}
