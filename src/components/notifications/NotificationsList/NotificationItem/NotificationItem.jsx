"use client";

import styles from "./NotificationItem.module.css";
import cn from "classnames";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { viewNotification } from "@/modules/notifications/api";

import { timestampToDate } from "@/lib/helpers";

import { notificationTypes } from "@/lib/constants";

import { useNotifications } from "@/context/NotificationsContext";

export default function NotificationItem({
  type,
  createdAt,
  isViewed,
  id: notificationId,
  linkId,
  message,
}) {
  const { updateNotificationViewed } = useNotifications();
  const { push } = useRouter();

  const handleClick = () => {
    if (!isViewed) {
      updateNotificationViewed(notificationId);
      viewNotification(notificationId);
    }

    switch (type) {
      case notificationTypes.escrow:
        push(`/escrow/${linkId}`);
        break;
      default:
        console.error("Unknown notification type: ", type);
        break;
    }
  };

  const date = timestampToDate(createdAt, "MMMM D, YYYY — HH:mm");

  return (
    <button
      type="button"
      className={cn(styles.item, { [styles.viewed]: isViewed })}
      onClick={handleClick}
    >
      <div
        className={cn(styles.item__imageWrap, { [styles.viewed]: isViewed })}
      >
        <Image
          src="/images/np_bell.svg"
          width={17.48}
          height={17.48}
          alt="Notification Bell"
          className={styles.item__imageWrap__image}
        />
      </div>
      <div className={styles.item__content}>
        <p className={styles.item__content__description}>{message}</p>
        <p className={styles.item__content__date}>{date}</p>
      </div>
    </button>
  );
}
