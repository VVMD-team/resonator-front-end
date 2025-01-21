"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useLoading } from "@/lib/hooks";

import { openWebsocketClient } from "@/lib/websocket-client";

import { getNotifications } from "@/modules/notifications/api";

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [activeNotificationCount, setActiveNotificationCount] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const updateNotificationViewed = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === id) {
          return {
            ...notification,
            isViewed: true,
          };
        }
        return notification;
      })
    );
  };

  useEffect(() => {
    setActiveNotificationCount(
      notifications.reduce(
        (count, { isViewed }) => (isViewed ? count : count + 1),
        0
      )
    );
  }, [notifications]);

  useEffect(() => {
    startLoading();
    getNotifications()
      .then((notifications) => {
        setNotifications(notifications);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => {
        stopLoading();
      });
  }, []);

  useEffect(() => {
    const ws = openWebsocketClient();

    ws.onmessage = (event) => {
      try {
        const recievedNotification = JSON.parse(event.data);

        console.log({ recievedNotification });

        setNotifications((prev) => [recievedNotification, ...prev]);
      } catch (error) {
        console.error("onmessage error: ", error);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        updateNotificationViewed,
        activeNotificationCount,
        isLoadingNotifications: isLoading,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (typeof context === "undefined") {
    throw new Error("useNotifications must be used in a NotificationsContext");
  }

  return context;
};
