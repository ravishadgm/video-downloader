import styles from "./CarouselPreview.module.scss";

export default function CarouselPreview({ data }) {
  return (
    <div className={styles.carousel}>
      {data.mediaUrls?.map((url, i) => (
        <div className={styles.carouselItem} key={i}>
          <img src={url} alt={`carousel-${i}`} />
        </div>
      ))}
    </div>
  );
}
