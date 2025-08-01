import Link from "next/link";
import styles from "./style.module.scss";
import {
  FaPaste,
  FaVideo,
  FaImage,
  FaRegCalendarAlt,
  FaRegEye,
} from "react-icons/fa";
import { MdOutlineSlideshow, MdOutlineViewCarousel } from "react-icons/md";

export default function Downloader({
  title = "Instagram Downloader",
  subtitle = "Download Instagram Videos, Photos, Reels, IGTV & carousel",
}) {
  return (
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
        ].map(({ label, icon, path }, index) => (
          <div className={styles.category_element} key={index}>
            <Link href={path}>
              {icon}
              <span>{label}</span>{" "}
            </Link>
          </div>
        ))}
      </nav>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>

      <form className={styles.search_form}>
        <div className={styles.search_form__field}>
          <label className={styles.search_form__label}>
            <input
              type="text"
              placeholder="Insert instagram link here"
              className={styles.search_form__input}
            />
          </label>
          <div className={styles.search_form__clipboard}>
            <button className={styles.search_form__clipboard_paste}>
              <FaPaste />
              Paste
            </button>
            <button style={{ display: "none" }}>Paste</button>
          </div>
        </div>
        <button className={styles.search_form__button}>download</button>
      </form>
    </div>
  );
}
