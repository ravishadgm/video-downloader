'use client';
import Image from 'next/image';

import styles from './AppPromotion.module.scss';
import { FaDownload } from 'react-icons/fa';
import Link from 'next/link';
import Images from '../../../public/images';

export default function AppPromotion() {
    return (
        <section className={styles.promo} aria-labelledby="app-promo-heading" role="region">
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={Images.mobile}
                            alt="Mobile phone displaying Instagram app interface with downloaded content"
                            fill
                            className={styles.phoneImage}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <h2 id="app-promo-heading">Download with mobile app</h2>
                    <p>
                        Download any photos, videos, reels, IGTV in one click! Our app provides fast, high-resolution downloads
                        without watermarks, making it an ideal choice for downloading Instagram content.
                    </p>
                    <Link href="/">
                        <button className={styles.installBtn} type="button" aria-label="Install mobile app for downloading Instagram content">
                            <FaDownload size={18} />
                            Install now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}