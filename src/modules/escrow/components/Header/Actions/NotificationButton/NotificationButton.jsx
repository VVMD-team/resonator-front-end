"use client";

import styles from "./NotificationButton.module.css";
import cn from "classnames";

import { useEscrowMainPageView } from "@/modules/escrow/context/EscrowMainPageViewContext";
import { useNotifications } from "@/context/NotificationsContext";

import Image from "next/image";

export default function NotificationButton() {
  const { activeNotificationCount } = useNotifications();
  const { view, changeView } = useEscrowMainPageView();

  const handleChangeView = () => {
    if (view === "mob_notifications") {
      changeView("main");
      return;
    }

    changeView("mob_notifications");
  };

  return (
    <button
      type="button"
      className={cn(styles.container, {
        [styles.hasNotifications]: activeNotificationCount > 0,
        [styles.active]: view === "mob_notifications",
      })}
      onClick={handleChangeView}
    >
      <Image
        src="/images/np_bell_secondary.svg"
        width={24}
        height={24}
        alt="Notification Bell"
        className={styles.container__image}
      />
    </button>
  );
}
