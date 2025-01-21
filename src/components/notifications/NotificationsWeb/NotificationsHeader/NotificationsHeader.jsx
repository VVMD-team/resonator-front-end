import styles from "./NotificationsHeader.module.css";

import Counter from "./Counter";

export default function NotificationsHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <p>Notifications</p>
        <Counter />
      </div>
      <div className={styles.header__divider}></div>
    </div>
  );
}
