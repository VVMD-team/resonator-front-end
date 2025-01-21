import styles from "./NotificationsList.module.css";

import { useNotifications } from "@/context/NotificationsContext";

import NotificationItem from "./NotificationItem";

export default function NotificationsList() {
  const { notifications, isLoadingNotifications } = useNotifications();

  return (
    <div className={styles.list}>
      {!isLoadingNotifications &&
        (notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem {...notification} key={notification.id} />
          ))
        ) : (
          <p style={{ color: "#808080" }}>No notifications yet</p>
        ))}
    </div>
  );
}
