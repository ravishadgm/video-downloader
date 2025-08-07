"use client";

import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import styles from "./BottomActivityPanel.module.scss";
import PostCaption from "../PostCaption/PostCaption";
import { formatNumber } from "@/instaModal/hooks/formatNumber/formatNumber";
import { handleShare, handleShareAll } from "@/instaModal/hooks/share/share";
import { handleDownload, handleDownloadAll } from "@/instaModal/hooks/download/download";

export default function BottomActivityPanel({ data }) {
  const {
    currentMediaUrl,
    currentMediaIndex,
    mediaUrls = [],
    likes = 0,
    views = 0,
    username,
    caption,
  } = data;




  const formattedLikes = formatNumber(likes);
  const formattedViews = formatNumber(views);

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.acitivityDetails}>
        <div className={styles.insideAcitivity}>
          <FaRegHeart />
          <IoIosEye />
        </div>

        <div className={styles.shareDownload}>
          <button
            className={styles.innerBtn}
            onClick={() => handleShare(currentMediaUrl)}
          >
            Share
          </button>
          <button
            className={styles.innerBtn}
            onClick={() => handleDownload(currentMediaUrl, currentMediaIndex)}
          >
            Download
          </button>
        </div>
      </div>

      {(formattedLikes || formattedViews) && (
        <div className={styles.counterSection}>
          <p>
            {formattedLikes && `${formattedLikes} likes`}
            {formattedLikes && formattedViews ? " and " : ""}
            {formattedViews && `${formattedViews} views`}
          </p>
          {caption && <PostCaption username={username} caption={caption} />}
          <div className={styles.shareDownload}>
            <button className={styles.shareBtn} onClick={()=>handleShareAll(mediaUrls)}>
              Share All
            </button>
            <button className={styles.shareBtn} onClick={()=>handleDownloadAll(mediaUrls)}>
              Download All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
