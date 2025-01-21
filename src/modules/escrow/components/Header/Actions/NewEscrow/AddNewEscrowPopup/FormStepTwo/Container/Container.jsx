import styles from "./Container.module.css";

export default function Container({ children, title }) {
  return (
    <div className={styles.popup_section}>
      <div className={styles.popup_section_field}>
        <p>{title}</p>
        <div className={styles.popup_section_divider}></div>
      </div>
      {children}
    </div>
  );
}
