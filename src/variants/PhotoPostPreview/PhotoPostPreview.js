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

  const isVideo = (url) => /\.(mp4|webm|ogg)(\?.*)?$/.test(url);

  const handleDownload = (url, index) => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}&t=${Date.now()}`;
    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = `media-${index + 1}`;
    document.body.appendChild(link);
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
    }, 100);
  };

  const handleShare = (url) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Instagram Post",
          url,
        })
        .catch(console.error);
    } else {
      alert("Sharing not supported in this browser.");
      onShare?.(url);
    }
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
        {data.avatar && (
          <Image
            src={data.avatar}
            alt={data.username}
            width={40}
            height={40}
            className={styles.avatar}
          />
        )}
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
                {isVideo(url) ? (
                  <video
                    className={styles.image}
                    controls
                    playsInline
                    muted
                    preload="metadata"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
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
                    className={styles.actionButton}
                    onClick={() => handleDownload(url, idx)}
                    title="Download"
                  >
                    <FaDownload />
                   
                  </button>

                  <button
                    className={styles.actionButton}
                    onClick={() => handleShare(url)}
                    title="Share"
                  >
                     <FaShareAlt style={{ pointerEvents: "none" }} />

               
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
            <FaHeart /> {data.likes?.toLocaleString() ?? 0}
          </span>
        </div>

        {data.caption && (
          <div className={styles.caption}>
            {data.caption.split("\n").map((line, i) => (
              <p key={i}>{i === 0 ? <b>{line}</b> : line}</p>
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
