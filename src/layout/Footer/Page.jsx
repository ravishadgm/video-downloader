"use client";

import Link from "next/link";
import Image from 'next/image';
import styles from "./Footer.module.scss";
import Images from "../../../public/images/index";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footerRoot}`}>
      <div className={styles.container}>

        <div className={styles.logo}>
          <Link href="/" aria-label="InstaDl homepage">
            {/* <span className={styles.logoText}>InstaDl</span> */}
            <Image src={Images.Logo} alt="InstaDl Logo" width={100} height={25} />
          </Link>
        </div>

        <div className={styles.navLinks} aria-label="Main navigation">
          <Link href="/video" className={styles.link}>Video</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/photo" className={styles.link}>Photo</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/reels" className={styles.link}>Reels</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/story" className={styles.link}>Story</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/viewer" className={styles.link}>Viewer</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/igtv" className={styles.link}>Igtv</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/carousel" className={styles.link}>Carousel</Link>
        </div>

        <div className={styles.footerLinks} aria-label="Legal and support">
          <Link href="/contact-us" className={styles.link}>Contact</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/terms-and-condition" className={styles.link}>Terms & Conditions</Link>
        </div>

        <div className={styles.additionalLinks} aria-label="Additional services">
          <Link href="/" className={styles.link}>Horoscope</Link>
          <span className={styles.separator} aria-hidden="true">|</span>
          <Link href="/" className={styles.link}>Tiktok Downloader</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        <span aria-label={`Copyright ${currentYear} InstaDownloader. All rights reserved.`}>
          © 2024–{currentYear} InstaDownloader. All rights reserved.
        </span>
      </div>
    </footer>
  );
}