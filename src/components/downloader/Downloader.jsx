"use client";

import { useState } from "react";
import Link from "next/link";
import MediaPreview from "@/components/mediaPreview/MediaPreview";
import styles from "./style.module.scss";
import { mainNavLinks } from "@/dataStore/linksContent";
import { downloadInstagramMedia } from "@/utils/api";
import { FaPaste, FaTimes } from "@/icons/index";

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
      const data = await downloadInstagramMedia(url);
      setMediaData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
    } catch {
      alert("Paste manually using Ctrl+V (or ⌘+V on Mac).");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <nav className={styles.category}>
          {mainNavLinks?.map(({ label, icon, href }, idx) => (
            <div className={styles.category_element} key={idx}>
              <Link href={href}>
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
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner} />
          <p className={styles.loaderMessage}>
            We are downloading the stories. Please wait :)
          </p>
        </div>
      ) : (
        <MediaPreview mediaData={mediaData} />
      )}
    </>
  );
}
