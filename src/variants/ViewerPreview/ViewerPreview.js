'use client';
import styles from "./ViewerPreview.module.scss";
import { FaHeart, FaEye, FaPaperPlane, FaMusic } from "react-icons/fa";

export default function ViewerPreview({ data, onShare }) {
  const isVideo = data.mediaUrl?.includes(".mp4");

  return (
    <div className={styles.viewerContainer}>
      {isVideo ? (
        <video
          className={styles.media}
          src={`/api/proxy?url=${encodeURIComponent(data.mediaUrl)}`}
          poster={`/api/proxy?url=${encodeURIComponent(data.thumbnail || "")}`}
          controls
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          className={styles.media}
          src={`/api/proxy?url=${encodeURIComponent(data.mediaUrl)}`}
          alt="Post Media"
        />
      )}

      <div className={styles.overlayContent}>
        {/* Left Side */}
        <div className={styles.leftContent}>
          <p className={styles.username}>@{data.username || "username"}</p>
          <p className={styles.caption}>{data.caption || "Photo caption"}</p>
          <p className={styles.music}>
            <FaMusic /> Original audio
          </p>
        </div>

        {/* Right Side Actions */}
        <div className={styles.rightActions}>
          <div className={styles.icon}>
            <FaHeart />
            <span>{data.likes?.toLocaleString() ?? "0"}</span>
          </div>
          <div className={styles.icon}>
            <FaEye />
            <span>{data.views?.toLocaleString() ?? "0"}</span>
          </div>
          <div className={styles.icon} onClick={onShare}>
            <FaPaperPlane />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
