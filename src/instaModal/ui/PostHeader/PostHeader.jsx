// components/common/PostHeader.jsx
"use client";

import Image from "next/image";
import styles from "./PostHeader.module.scss"; // create this SCSS file for styles if needed

export default function PostHeader({ avatar, username }) {
  if (!username) return null;

  return (
    <div className={styles.header}>
      {avatar && (
        <Image
          src={avatar}
          alt={username}
          width={40}
          height={40}
          className={styles.avatar}
        />
      )}
      <span className={styles.username}>@{username}</span>
    </div>
  );
}
