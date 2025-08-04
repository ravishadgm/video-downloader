"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./PhotoPostPreview.module.scss";
import {
  FaDownload,
  FaShareAlt,
  FaHeart,
  FaComment,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function PhotoPostPreview({ data, onShare }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const handleDownload = (url, index) => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = `image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

 
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        {data.avatar ? (
          <Image
            src={data.avatar}
            alt={`${data.username}`}
            width={40}
            height={40}
            className={styles.avatar}
          />
        ) : null}
        <span className={styles.username}>@{data.username}</span>
      </div>

      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={setSwiperInstance}
        >
          {data.mediaUrls?.filter(Boolean).map((url, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.imageWrapper}>
                {url && (
                  <Image
                    src={url}
                    alt={`Slide ${idx + 1}`}
                    width={500}
                    height={500}
                    className={styles.image}
                  />
                )}
                <div className={styles.actions}>
                  <button
                    onClick={() => handleDownload(url, idx)}
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button onClick={() => onShare(url)} title="Share">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button ref={prevRef} className={styles.prevButton}>
          <FaChevronLeft />
        </button>
        <button ref={nextRef} className={styles.nextButton}>
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.details}>
        <div className={styles.stats}>
          <span>
            <FaHeart /> {data.likes}
          </span>
        </div>
      {data.caption && (
  <div className={styles.caption}>
    {data.caption.split("\n").map((line, index) => (
      <p key={index}>
        {index === 0 ? <b>{line}</b> : line}
      </p>
    ))}
  </div>
)}

        {data.timestamp && (
          <p className={styles.date}>{formatDate(data.timestamp)}</p>
        )}
      </div>
    </div>
  );
}
