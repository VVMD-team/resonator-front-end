"use client";

import { useEffect, useState } from "react";
import { checkAuth } from "@/modules/auth/api";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import LoginPopup from "@/modules/wallet/components/LoginPopup";

const loginPopupId = "login-popup";

export default function LoginPage() {
  const [isRenderWalletAuth, setIsRenderWalletAuth] = useState(false);
  const { isConnected } = useAccount();

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      if (isConnected) {
        try {
          const authenticated = await checkAuth();
          if (authenticated) {
            router.replace("/");
          } else {
            setIsRenderWalletAuth(true);
          }
        } catch (error) {
          setIsRenderWalletAuth(true);
        }
      } else {
        localStorage.clear();
        sessionStorage.clear();
        setIsRenderWalletAuth(true);
      }
    };

    check();
  }, [router, isConnected]);

  return isRenderWalletAuth ? <LoginPopup loginPopupId={loginPopupId} /> : null;
}
