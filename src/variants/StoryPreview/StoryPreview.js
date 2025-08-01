import styles from "./StoryPreview.module.scss";

export default function StoryPreview({ data }) {
  return (
    <div className={styles.story}>
      <img src={data.mediaUrl} alt="Story" />
      <p>@{data.username}</p>
    </div>
  );
}
