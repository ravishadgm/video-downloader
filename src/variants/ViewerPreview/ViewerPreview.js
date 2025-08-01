import styles from "./ViewerPreview.module.scss";

export default function ViewerPreview({ data }) {
  return (
    <div className={styles.viewer}>
      <img src={data.mediaUrl} alt="Viewer Media" />
      <p>{data.caption}</p>
    </div>
  );
}
