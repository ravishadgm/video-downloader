// components/Downloader.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import {
  FaPaste,
  FaVideo,
  FaImage,
  FaRegCalendarAlt,
  FaRegEye,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineSlideshow, MdOutlineViewCarousel } from "react-icons/md";
import MediaPreview from "../mediaPreview/MediaPreview";

export default function Downloader({
  title = "Instagram Downloader",
  subtitle = "Download Instagram Videos, Photos, Reels, IGTV & carousel",
}) {
  const [url, setUrl] = useState("");
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    setLoading(true);
    setError("");
    setMediaData(null);

    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setMediaData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share && mediaData) {
      navigator.share({
        title: "Instagram Media",
        url: mediaData.mediaUrl,
      });
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };
  const handlePaste = async () => {
    try {
      if (!navigator.clipboard) {
        alert("Clipboard not supported. Please paste manually (Ctrl+V).");
        return;
      }

      const text = await navigator.clipboard.readText();
      setUrl(text.trim());
    } catch (err) {
      if (err.name === "NotAllowedError") {
        alert(
          "Clipboard blocked. Click the clipboard icon in address bar to allow, or paste manually (Ctrl+V)."
        );
      } else {
        alert("Paste manually using Ctrl+V (or ⌘+V on Mac).");
      }
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <nav className={styles.category}>
          {[
            { label: "Video", icon: <FaVideo />, path: "/video" },
            { label: "Photo", icon: <FaImage />, path: "/photo" },
            { label: "Reels", icon: <FaRegCalendarAlt />, path: "/reels" },
            { label: "Story", icon: <MdOutlineSlideshow />, path: "/story" },
            { label: "Igtv", icon: <FaVideo />, path: "/igtv" },
            {
              label: "Carousel",
              icon: <MdOutlineViewCarousel />,
              path: "/carousel",
            },
            { label: "Viewer", icon: <FaRegEye />, path: "/viewer" },
          ].map(({ label, icon, path }, idx) => (
            <div className={styles.category_element} key={idx}>
              <Link href={path}>
                {icon}
                <span>{label}</span>
              </Link>
            </div>
          ))}
        </nav>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <form className={styles.search_form} onSubmit={handleDownload}>
          <div className={styles.search_form__field}>
            <label className={styles.search_form__label}>
              <input
                type="text"
                placeholder="Insert Instagram link here"
                className={styles.search_form__input}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                required
              />
            </label>

            <div className={styles.search_form__clipboard}>
              {url.trim() === "" ? (
                <button
                  type="button"
                  disabled={loading}
                  className={styles.search_form__clipboard_paste}
                  onClick={handlePaste}
                >
                  <FaPaste />
                  Paste
                </button>
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  className={styles.search_form__clipboard_clear}
                  onClick={() => setUrl("")}
                >
                  <FaTimes />
                  Clear
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.search_form__button}
          >
            {loading ? "Fetching..." : "Download"}
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}
      </div>

      <MediaPreview mediaData={mediaData} onShare={handleShare} />
    </>
  );
}
