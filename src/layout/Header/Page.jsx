'use client';
import Link from 'next/link';
import Image from 'next/image';
import Images from "../../../public/images/index";
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="InstaDl homepage">
          <Image src={Images.Logo} alt="InstaDl Logo" fill className={styles.logoImage} />
        </Link>
        <nav aria-label="Header navigation">
          <Link href="/faq" className={styles.link}>FAQ</Link>
        </nav>
        {/* <Link href="/faq" className={styles.link}>FAQ</Link> */}
      </div>
    </header>
  );
}
