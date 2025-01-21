import styles from "./NotificationsMobile.module.css";

import NotificationsList from "../NotificationsList";

import Header from "./Header";

export default function NotificationsMobile() {
  return (
    <div className={styles.container}>
      <Header />

      <NotificationsList />
    </div>
  );
}
