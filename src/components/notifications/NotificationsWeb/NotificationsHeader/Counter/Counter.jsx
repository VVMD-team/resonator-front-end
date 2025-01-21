import styles from "./Counter.module.css";
import cn from "classnames";

import { useNotifications } from "@/context/NotificationsContext";

export default function Counter() {
  const { activeNotificationCount } = useNotifications();

  return (
    activeNotificationCount > 0 && (
      <p
        className={cn(styles.counter, {
          [styles.fixedWidth]: activeNotificationCount < 100,
        })}
      >
        {activeNotificationCount}
      </p>
    )
  );
}
