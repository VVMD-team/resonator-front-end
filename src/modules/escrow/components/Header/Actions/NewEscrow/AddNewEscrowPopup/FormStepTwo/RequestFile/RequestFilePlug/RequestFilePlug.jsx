import styles from "./RequestFilePlug.module.css";

export default function RequestFilePlug() {
  return (
    <div className={styles.request}>
      <div className={styles.request__label}>
        File will be provided by counterparty.
      </div>
    </div>
  );
}
