"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./StoryPreview.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function StoryPreview({ stories = [] }) {
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

  if (!Array.isArray(stories) || stories.length === 0) {
    return (
      <div className={styles.storyEmpty}>
        <p>No stories found for this user.</p>
      </div>
    );
  }

  return (
    <div className={styles.storyWrapper}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        onSwiper={setSwiperInstance}
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
                    controls
                    className={styles.storyMedia}
                    preload="metadata"
                  />
                ) : image ? (
                  <img
                    src={image}
                    alt={`story-${idx}`}
                    className={styles.storyMedia}
                  />
                ) : (
                  <div className={styles.storyPlaceholder}>No media available</div>
                )}

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

      <button ref={prevRef} className={styles.navButton + " " + styles.prevButton}>
        <FaChevronLeft />
      </button>
      <button ref={nextRef} className={styles.navButton + " " + styles.nextButton}>
        <FaChevronRight />
      </button>
    </div>
  );
}
