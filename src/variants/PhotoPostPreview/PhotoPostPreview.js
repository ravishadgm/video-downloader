// mediaPreview/variants/PhotoPostPreview.jsx
import styles from "./PhotoPostPreview.module.scss";
import { FaDownload, FaShareAlt } from "react-icons/fa";

export default function PhotoPostPreview({ data, onShare }) {
  return (
<div className={styles.container}>
  <img src={data.mediaUrl} alt="Instagram post" />
  <div className={styles.info}>
    <p><strong>User:</strong> @{data.username}</p>
    <p><strong>Likes:</strong> ❤️ {data.likes}</p>
    <p><strong>Comments:</strong> 💬 {data.comments}</p>
  </div>
  <div className={styles.actions}>
    <a href={data.mediaUrl} download><FaDownload /> Download</a>
    <button onClick={onShare}><FaShareAlt /> Share</button>
  </div>
</div>

  );
}
