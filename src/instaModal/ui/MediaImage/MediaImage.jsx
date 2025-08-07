// components/Media/MediaImage.jsx
"use client";

import Image from "next/image";
import styles from "./MediaImage.module.scss";
export default function MediaImage({ src, alt, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500} // fixed width
      height={500} // fixed height
      className={styles.image}
    />
  );
}
