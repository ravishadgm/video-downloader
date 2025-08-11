"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "@/icons/index";
import styles from "./StoryPreview.module.scss";

export default function StoryPreview({
    stories = [],
    startMediaUrl,
    startStoryId,
}) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // store dom refs for every video slide so we can control play/pause/resume reliably
    const videoRefs = useRef([]);
    videoRefs.current = videoRefs.current || [];

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeDuration, setActiveDuration] = useState(4000);
    const [isPlaying, setIsPlaying] = useState(false); // is any video currently playing
    const [isPaused, setIsPaused] = useState(true); // global "paused" state (affects autoplay/progress)

    // 1) Flatten stories (preserve everything). Do NOT filter out items — user requested all visible.
    const flattenedStories = useMemo(() => {
        const out = [];
        (stories || []).forEach((s) => {
            out.push(s);
            if (s?.reel_media && Array.isArray(s.reel_media) && s.reel_media.length) {
                s.reel_media.forEach((r) => out.push(r));
            }
        });
        return out;
    }, [stories]);

    // 2) Compute an initial index from startMediaUrl / startStoryId (if provided)
    const computedInitialIndex = useMemo(() => {
        if (!flattenedStories || flattenedStories.length === 0) return 0;
        let idx = -1;

        if (startStoryId != null) {
            idx = flattenedStories.findIndex((s) => {
                const sid = s?.id ?? s?.pk ?? s?.item_id ?? s?.media_id;
                if (sid == null) return false;
                return sid.toString() === startStoryId.toString();
            });
        }

        if (idx === -1 && startMediaUrl) {
            const target = startMediaUrl;
            idx = flattenedStories.findIndex((s) => {
                // check video urls
                if (Array.isArray(s?.video_versions)) {
                    if (
                        s.video_versions.some(
                            (v) =>
                                v?.url === target ||
                                (v?.url && target && v.url.includes(target))
                        )
                    ) {
                        return true;
                    }
                }
                // check image candidates
                if (Array.isArray(s?.image_versions2?.candidates)) {
                    if (
                        s.image_versions2.candidates.some(
                            (c) =>
                                c?.url === target ||
                                (c?.url && target && c.url.includes(target))
                        )
                    ) {
                        return true;
                    }
                }
                // display_resources
                if (Array.isArray(s?.display_resources)) {
                    if (
                        s.display_resources.some(
                            (r) =>
                                r?.src === target ||
                                (r?.src && target && r.src.includes(target))
                        )
                    ) {
                        return true;
                    }
                }
                // a generic url field
                if (
                    typeof s?.url === "string" &&
                    (s.url === target || (target && s.url.includes(target)))
                ) {
                    return true;
                }
                return false;
            });
        }

        return idx >= 0 ? idx : 0;
    }, [flattenedStories, startMediaUrl, startStoryId]);

    // Initialize currentIndex to computedInitialIndex (runs once)
    useEffect(() => {
        setCurrentIndex(computedInitialIndex);
    }, [computedInitialIndex]);

    // If computedInitialIndex changes after mount and swiper exists, jump to it immediately (no animation).
    useEffect(() => {
        if (swiperInstance) {
            try {
                swiperInstance.slideTo(computedInitialIndex, 0);
            } catch (e) {
                // ignore if swiper not ready
            }
        }
        // also update state
        setCurrentIndex(computedInitialIndex);
    }, [computedInitialIndex, swiperInstance]);

    // Init swiper navigation elements once swiper is ready
    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    // Helper: pause every video element (used when switching slides)
    const pauseAllVideos = () => {
        try {
            videoRefs.current.forEach((v) => {
                if (v && !v.paused) {
                    v.pause();
                }
            });
        } catch (e) {
            // ignore
        }
    };

    // When the active slide changes, update duration (video or image) and pause other videos.
    useEffect(() => {
        const active = flattenedStories[currentIndex];
        const vEl = videoRefs.current[currentIndex];

        // If there is a video element DOM available, use its duration (listen for loadedmetadata if unknown)
        if (vEl) {
            if (vEl.duration && isFinite(vEl.duration)) {
                setActiveDuration(Math.max(4000, vEl.duration * 1000));
            } else {
                // wait for metadata
                const onMeta = () => {
                    if (vEl.duration && isFinite(vEl.duration)) {
                        setActiveDuration(Math.max(4000, vEl.duration * 1000));
                    } else {
                        setActiveDuration(4000);
                    }
                };
                vEl.addEventListener("loadedmetadata", onMeta, { once: true });
                // cleanup
                return () => {
                    vEl.removeEventListener("loadedmetadata", onMeta);
                };
            }
        } else {
            // fallback for images or missing media
            setActiveDuration(4000);
        }
        // pause other videos (safety)
        pauseAllVideos();
        // start slide paused by default — user can press play
        setIsPlaying(false);
        setIsPaused(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, flattenedStories]);

    // Auto-advance timer (only when not paused)
    useEffect(() => {
        if (!isPaused) {
            const timer = setTimeout(() => {
                swiperInstance?.slideNext();
            }, activeDuration);
            return () => clearTimeout(timer);
        }
    }, [activeDuration, swiperInstance, currentIndex, isPaused]);

    // Toggle play/pause for the active slide
    const togglePlayPause = () => {
        const vEl = videoRefs.current[currentIndex];
        // if active slide is a video, play/pause it (resume from currentTime)
        if (vEl) {
            if (!vEl.paused) {
                vEl.pause();
                setIsPlaying(false);
                setIsPaused(true);
            } else {
                // try to play; browsers may reject play() if not user-initiated — user clicks the button, so fine
                vEl
                    .play()
                    .then(() => {
                        setIsPlaying(true);
                        setIsPaused(false);
                    })
                    .catch((err) => {
                        console.warn("Play failed:", err);
                        setIsPlaying(false);
                        setIsPaused(true);
                    });
            }
            return;
        }

        setIsPaused((p) => !p);
    };

    if (!flattenedStories || flattenedStories.length === 0) {
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
                {flattenedStories.map((_, idx) => (
                    <div key={idx} className={styles.progressContainer}>
                        <div
                            className={`${styles.progressFill} ${idx === currentIndex && !isPaused ? styles.animateFill : ""
                                }`}
                            style={{
                                animationDuration:
                                    idx === currentIndex ? `${activeDuration}ms` : "0ms",
                                width: idx < currentIndex ? "100%" : undefined,
                                animationPlayState: isPaused ? "paused" : "running",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation]}
                loop={false}
                onSwiper={setSwiperInstance}
                initialSlide={computedInitialIndex}
                onSlideChange={(swiper) => {
                    pauseAllVideos();
                    setCurrentIndex(swiper.activeIndex);
                    setIsPlaying(false);
                    setIsPaused(true);
                }}
                className={styles.storySwiper}
            >
                {flattenedStories.map((story, idx) => {
                    const videoUrl = story?.video_versions?.[0]?.url;
                    const image =
                        story?.image_versions2?.candidates?.[0]?.url ||
                        story?.display_resources?.[0]?.src ||
                        story?.image_versions?.standard_resolution?.url;

                    return (
                        <SwiperSlide key={idx}>
                            <div className={styles.storySlide}>
                                {videoUrl ? (
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[idx] = el;
                                        }}
                                        src={videoUrl}
                                        muted
                                        loop
                                        playsInline
                                        className={styles.storyMedia}
                                        data-story-video="true"
                                        onError={(e) => console.warn("Video failed to load:", e)}
                                        onPlay={() => {
                                            setIsPlaying(false);
                                            setIsPaused(true);
                                        }}
                                        onPause={() => {
                                            setIsPlaying(false);
                                            setIsPaused(true);
                                        }}
                                    />
                                ) : image ? (
                                    <img
                                        src={image}
                                        alt={`story-${idx}`}
                                        className={styles.storyMedia}
                                        onError={(e) => {
                                            // console.warn("Image failed to load-----------------", e.target.src);
                                            const altImage =
                                                story?.display_resources?.[1]?.src ||
                                                story?.image_versions?.low_resolution?.url;
                                            if (altImage && e.target.src !== altImage) {
                                                e.target.src = altImage;
                                            }
                                        }}
                                        onLoad={() => console.log("Image loaded:", image)}
                                    />
                                ) : (
                                    <div className={styles.storyPlaceholder}>
                                        <p>Story content not available</p>
                                        {story?.caption && <small>{story.caption}</small>}
                                    </div>
                                )}

                                <div className={styles.storyTopBar}>
                                    <div className={styles.storyUser}>
                                        {story?.user?.profile_pic_url && (
                                            <img
                                                src={story.user.profile_pic_url}
                                                alt={story.user?.username}
                                                className={styles.storyAvatar}
                                                onError={(e) => (e.target.style.display = "none")}
                                            />
                                        )}
                                        <span>@{story?.user?.username || "unknown"}</span>
                                    </div>

                                    <button
                                        className={styles.playPauseButton}
                                        onClick={togglePlayPause}
                                    >
                                        {isPlaying && !isPaused ? <FaPause /> : <FaPlay />}
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Navigation buttons */}
            <button
                ref={prevRef}
                className={`${styles.navButton} ${styles.prevButton}`}
            >
                <FaChevronLeft />
            </button>
            <button
                ref={nextRef}
                className={`${styles.navButton} ${styles.nextButton}`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
}


















"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "@/icons/index";
import styles from "./StoryPreview.module.scss";

export default function StoryPreview({ stories = [] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const videoRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeDuration, setActiveDuration] = useState(4000);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    // Flatten stories to include sub-stories
    const flattenedStories = stories.reduce((acc, story) => {
        acc.push(story);
        if (story.reel_media && story.reel_media.length > 0) {
            acc.push(...story.reel_media);
        }
        return acc;
    }, []);

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
        const activeStory = flattenedStories[currentIndex];
        const isVideo = activeStory?.video_versions?.[0]?.url;

        if (isVideo) {
            const video = document.createElement("video");
            video.src = activeStory.video_versions[0].url;
            video.onloadedmetadata = () => {
                setActiveDuration(video.duration * 1000);
            };
            video.onerror = () => {
                console.warn("Video failed to load, using default duration");
                setActiveDuration(4000);
            };
        } else {
            setActiveDuration(4000);
        }
    }, [currentIndex, flattenedStories]);

    // Auto move to next slide
    useEffect(() => {
        if (!isPaused) {
            const timer = setTimeout(() => {
                swiperInstance?.slideNext();
            }, activeDuration);
            return () => clearTimeout(timer);
        }
    }, [activeDuration, swiperInstance, currentIndex, isPaused]);

    const togglePlayPause = () => {
        const activeStory = flattenedStories[currentIndex];
        const isVideo = activeStory?.video_versions?.[0]?.url;

        if (isVideo && videoRef.current) {
            if (isPlaying) {
                // Pause
                videoRef.current.pause();
                setIsPlaying(false);
                setIsPaused(true);
            } else {
                // Resume from last position
                videoRef.current
                    .play()
                    .catch((err) => console.warn("Play failed", err));
                setIsPlaying(true);
                setIsPaused(false);
            }
        } else {
            setIsPaused(!isPaused);
        }
    };

    if (!flattenedStories.length) {
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
                {flattenedStories.map((_, idx) => (
                    <div key={idx} className={styles.progressContainer}>
                        <div
                            className={`${styles.progressFill} ${idx === currentIndex && !isPaused ? styles.animateFill : ""
                                }`}
                            style={{
                                animationDuration:
                                    idx === currentIndex ? `${activeDuration}ms` : "0ms",
                                width: idx < currentIndex ? "100%" : undefined,
                                animationPlayState: isPaused ? "paused" : "running",
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
                onSlideChange={(swiper) => {
                    setCurrentIndex(swiper.activeIndex);
                    setIsPlaying(false);
                    setIsPaused(true);
                }}
                className={styles.storySwiper}
            >
                {flattenedStories.map((story, idx) => {
                    const video = story.video_versions?.[0]?.url;
                    const image =
                        story.image_versions2?.candidates?.[0]?.url ||
                        story.display_resources?.[0]?.src ||
                        story.image_versions?.standard_resolution?.url;

                    return (
                        <SwiperSlide key={idx}>
                            <div className={styles.storySlide}>
                                {video ? (
                                    <video
                                        ref={idx === currentIndex ? videoRef : null}
                                        src={video}
                                        autoPlay={!isPaused}
                                        muted
                                        loop
                                        playsInline
                                        className={styles.storyMedia}
                                        onError={(e) => console.warn("Video failed to load:", e)}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                ) : image ? (
                                    <img
                                        src={image}
                                        alt={`story-${idx}`}
                                        className={styles.storyMedia}
                                        onError={(e) => {
                                            console.warn("Image failed to load:", e.target.src);
                                            // Try alternative image sources
                                            const altImage =
                                                story.display_resources?.[1]?.src ||
                                                story.image_versions?.low_resolution?.url;
                                            if (altImage && e.target.src !== altImage) {
                                                e.target.src = altImage;
                                            }
                                        }}
                                        onLoad={() =>
                                            console.log("Image loaded successfully:", image)
                                        }
                                    />
                                ) : (
                                    <div className={styles.storyPlaceholder}>
                                        <p>Story content not available</p>
                                    </div>
                                )}

                                {/* Top bar with username and play/pause */}
                                <div className={styles.storyTopBar}>
                                    <div className={styles.storyUser}>
                                        {story.user?.profile_pic_url && (
                                            <img
                                                src={story.user.profile_pic_url}
                                                alt={story.user?.username}
                                                className={styles.storyAvatar}
                                                onError={(e) => (e.target.style.display = "none")}
                                            />
                                        )}
                                        <span>@{story.user?.username || "unknown"}</span>
                                    </div>

                                    <button
                                        className={styles.playPauseButton}
                                        onClick={togglePlayPause}
                                    >
                                        {isPlaying && !isPaused ? <FaPause /> : <FaPlay />}
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Navigation buttons */}
            <button
                ref={prevRef}
                className={`${styles.navButton} ${styles.prevButton}`}
            >
                <FaChevronLeft />
            </button>
            <button
                ref={nextRef}
                className={`${styles.navButton} ${styles.nextButton}`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
}





