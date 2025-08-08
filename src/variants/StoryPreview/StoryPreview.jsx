"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./StoryPreview.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function StoryPreview({ stories = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDuration, setActiveDuration] = useState(4000);

  // Initialize Swiper navigation
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Detect video duration or fallback
  useEffect(() => {
    const activeStory = stories[currentIndex];
    const isVideo = activeStory?.video_versions?.[0]?.url;

    if (isVideo) {
      const video = document.createElement("video");
      video.src = activeStory.video_versions[0].url;
      video.onloadedmetadata = () => {
        setActiveDuration(video.duration * 1000);
      };
    } else {
      setActiveDuration(4000);
    }
  }, [currentIndex, stories]);

  // Auto move to next slide
  useEffect(() => {
    const timer = setTimeout(() => {
      swiperInstance?.slideNext();
    }, activeDuration);
    return () => clearTimeout(timer);
  }, [activeDuration, swiperInstance, currentIndex]);

  if (!stories.length) {
    return (
      <div className={styles.storyEmpty}>
        <p>No stories found for this user.</p>
      </div>
    );
  }

  return (
    <div className={styles.storyWrapper}>
      {/* Progress bars */}
      <div className={styles.progressRow}>
        {stories.map((_, idx) => (
          <div key={idx} className={styles.progressContainer}>
            <div
              className={`${styles.progressFill} ${
                idx === currentIndex ? styles.animateFill : ""
              }`}
              style={{
                animationDuration:
                  idx === currentIndex ? `${activeDuration}ms` : "0ms",
                width: idx < currentIndex ? "100%" : undefined,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Swiper stories */}
      <Swiper
        modules={[Navigation]}
        loop={false}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {stories.map((story, idx) => {
          const video = story.video_versions?.[0]?.url;
          const image = story.image_versions2?.candidates?.[0]?.url;

          return (
            <SwiperSlide key={idx}>
              <div className={styles.storySlide}>
                {video ? (
                  <video
                    src={video}
                    autoPlay
                    muted
                    className={styles.storyMedia}
                  />
                ) : (
                  image && (
                    <img
                      src={image}
                      alt={`story-${idx}`}
                      className={styles.storyMedia}
                    />
                  )
                )}

                {/* Username */}
                <div className={styles.storyUser}>
                  {story.user?.profile_pic_url && (
                    <img
                      src={story.user.profile_pic_url}
                      alt={story.user?.username}
                      className={styles.storyAvatar}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <span>@{story.user?.username}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation buttons */}
      <button ref={prevRef} className={`${styles.navButton} ${styles.prevButton}`}>
        <FaChevronLeft />
      </button>
      <button ref={nextRef} className={`${styles.navButton} ${styles.nextButton}`}>
        <FaChevronRight />
      </button>
    </div>
  );
}
