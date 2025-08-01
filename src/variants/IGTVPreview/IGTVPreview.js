import styles from "./IGTVPreview.module.scss";

export default function IGTVPreview({ data }) {
  return (
    <div className={styles.igtv}>
      <video controls src={data.mediaUrl} />
      <div>
        <p>@{data.username}</p>
        <p>❤️ {data.likes}</p>
      </div>
    </div>
  );
}
