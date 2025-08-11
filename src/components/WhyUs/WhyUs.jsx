"use client";

import React from "react";
import { MdDownload, MdDevices, MdThumbUp, MdSecurity } from "@/icons/index";
import styles from "./styles.module.scss";

export default function WhyUs() {
  const titleId = React.useId();

  return (
    <section className={styles.wrapper} aria-labelledby={titleId} role="region">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title} id={titleId}>
            Choose InstaDl.app for download from Instagram
          </h1>

          <p className={styles.description}>
            Downloading videos from Instagram in just two clicks is possible
            without compromising on quality. Avoid using unreliable applications
            and appreciate the videos, even if they are of lower quality.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <article className={styles.feature} role="group" tabIndex={0}>
            <MdDownload
              className={styles.icon}
              aria-hidden="true"
              focusable="false"
            />
            <h3 className={styles.featureTitle}>Fast download</h3>
            <p className={styles.featureDescription}>
              Our servers are optimized to provide you with the fastest download
              speeds.
            </p>
          </article>

          <article className={styles.feature} role="group" tabIndex={0}>
            <MdDevices
              className={styles.icon}
              aria-hidden="true"
              focusable="false"
            />
            <h3 className={styles.featureTitle}>Support for all devices</h3>
            <p className={styles.featureDescription}>
              Whether you're on a mobile, tablet, or desktop, InstaDl has got
              you covered.
            </p>
          </article>

          <article className={styles.feature} role="group" tabIndex={0}>
            <MdThumbUp
              className={styles.icon}
              aria-hidden="true"
              focusable="false"
            />
            <h3 className={styles.featureTitle}>High quality</h3>
            <p className={styles.featureDescription}>
              Download Instagram content in its original quality without any
              loss.
            </p>
          </article>

          <article className={styles.feature} role="group" tabIndex={0}>
            <MdSecurity
              className={styles.icon}
              aria-hidden="true"
              focusable="false"
            />
            <h3 className={styles.featureTitle}>Security</h3>
            <p className={styles.featureDescription}>
              We prioritize your privacy. No login required and all downloads
              are processed securely.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
