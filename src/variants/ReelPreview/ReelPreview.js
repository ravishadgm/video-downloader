import { useState, useRef } from "react";
import styles from "./ReelPreview.module.scss";
import { FaHeart, FaEye, FaPaperPlane, FaMusic } from "react-icons/fa";

export default function ReelPreview({ data, onShare }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={data.mediaUrl}
        poster={`/api/proxy?url=${encodeURIComponent(data.thumbnail)}`}
        controls
        muted
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      <div className={styles.overlayContent}>
        <div className={styles.leftContent}>
          <p className={styles.username}>@{data.username || "username"}</p>
          <p className={styles.caption}>{data.caption || "Video caption"}</p>
          <p className={styles.music}>
            <FaMusic /> Original audio
          </p>
        </div>

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
