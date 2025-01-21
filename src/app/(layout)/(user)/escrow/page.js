"use client";

import styles from "./page.module.css";
import cn from "classnames";

import Title from "@/modules/escrow/ui/Title/Title";

import Header from "@/modules/escrow/components/Header";

import EscrowListActive from "@/modules/escrow/components/lists/EscrowListActive";
import EscrowListProposed from "@/modules/escrow/components/lists/EscrowListProposed";
import EscrowListHistory from "@/modules/escrow/components/lists/EscrowListHistory";

import EscrowsActiveProvider from "@/modules/escrow/context/EscrowsActiveProvider";
import {
  EscrowMainPageViewProvider,
  EscrowMainPageViewConsumer,
} from "@/modules/escrow/context/EscrowMainPageViewContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

import {
  NotificationsMobile,
  NotificationsWeb,
} from "@/components/notifications";

export default function EscrowPage() {
  return (
    <div className={styles.wrapper}>
      <Title text="Escrow" className={styles.wrapper__title} />

      <NotificationsProvider>
        <EscrowsActiveProvider>
          <EscrowMainPageViewProvider>
            <EscrowMainPageViewConsumer>
              {({ view }) => (
                <>
                  <Header />
                  <div
                    className={cn(styles.container, {
                      [styles.hiddenMobile]: view === "mob_notifications",
                    })}
                  >
                    <div className={styles.container__lists}>
                      <EscrowListActive />
                      <EscrowListProposed />
                      <EscrowListHistory />
                    </div>

                    <NotificationsWeb />
                  </div>

                  {view === "mob_notifications" && <NotificationsMobile />}
                </>
              )}
            </EscrowMainPageViewConsumer>
          </EscrowMainPageViewProvider>
        </EscrowsActiveProvider>
      </NotificationsProvider>
    </div>
  );
}
