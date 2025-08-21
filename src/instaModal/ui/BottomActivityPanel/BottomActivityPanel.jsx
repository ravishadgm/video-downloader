"use client";
import React from "react";
import PostCaption from "@/instaModal/ui/PostCaption/PostCaption";
import { handleShare, handleShareAll } from "@/instaModal/hooks/share/share";
import {
  handleDownload,
  handleDownloadAll,
} from "@/instaModal/hooks/download/download";
import { FaRegHeart, FaRegComment } from "@/icons/index";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const {
    mediaUrls = [],
    likes = 0,
    views = 0,
    comments = 0,
    username,
    caption,
  } = data;

  const displayUsername = username || "instagram_user";

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.counterSection}>
        {caption && (
          <PostCaption username={displayUsername} caption={caption} />
        )}

        <div className={styles.shareDownload}>
          <button
            className={styles.shareBtn}
            onClick={() => handleDownloadAll(mediaUrls)}
          >
            {mediaUrls.length > 1
              ? `Download All (${mediaUrls.length})`
              : "Download"}
          </button>
          <button
            className={styles.shareBtn}
            onClick={() => handleShareAll(mediaUrls)}
          >
            {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
