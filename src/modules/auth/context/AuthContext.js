"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";

import { checkAuth } from "@/modules/auth/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const router = useRouter();

  useEffect(() => {
    const checkIsAuth = async () => {
      if (!isConnected && pathname !== "/login") {
        await disconnectAsync();
        localStorage.clear();
        router.replace("/login");
      }

      try {
        const authenticated = await checkAuth();

        if (authenticated && isConnected && pathname === "/login") {
          router.replace("/");
        }
      } catch (error) {
        if (isConnected && pathname !== "/login") {
          try {
            await disconnectAsync();
          } catch (error) {
            console.error(error);
          }
        }

        if (pathname !== "/login") {
          localStorage.clear();
          router.replace("/login");
        }
      }
    };

    checkIsAuth();
  }, [router, isConnected]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (typeof context === "undefined") {
    throw new Error("useAuth must be user in a AuthProvider");
  }

  return context;
};
