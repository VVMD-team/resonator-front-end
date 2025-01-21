"use client";

import styles from "./NotificationsWeb.module.css";

import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "../NotificationsList";

export default function NotificationsWeb() {
  return (
    <div className={styles.container}>
      <NotificationsHeader />
      <NotificationsList />
    </div>
  );
}
