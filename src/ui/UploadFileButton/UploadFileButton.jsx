import styles from "./UploadFileButton.module.css";

import Icon from "./Icon";

export default function UploadFileButton({
  onChange,
  id = "fileInput",
  name = "upload",
  title = "Upload",
  subcaption = "Browse to choose a file",
}) {
  return (
    <div className={styles.upload}>
      <input
        onChange={onChange}
        id={id}
        type="file"
        name={name}
        className={styles.upload__input}
      />
      <label htmlFor={id} className={styles.upload__label}>
        <Icon className={styles.upload__label_icon} />
        <p>{title}</p>
        <p className={styles.upload__label_subcaption}>{subcaption}</p>
      </label>
    </div>
  );
}
