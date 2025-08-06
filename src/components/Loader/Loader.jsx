"use client";

import styles from "./styles.module.scss";

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading media...</p>
        </div>
    );
}







