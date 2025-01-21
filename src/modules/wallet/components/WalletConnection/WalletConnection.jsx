"use client";

import styles from "./WalletConnection.module.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authByWallet } from "@/modules/auth/api";

import { useSignMessage, useAccount, useDisconnect } from "wagmi";

import useLoading from "@/lib/hooks/useLoading";

import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";

import W3mButton from "./W3mButton";

import { authMessage, walletTypes } from "@/lib/constants";

const rejectSignMessageErrorCode = 4001;

export default function WalletConnection() {
  const router = useRouter();

  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const { address, isConnected } = useAccount();

  const {
    data: signMessageData,
    isLoading: isLoadingSignMessage,
    signMessageAsync,
  } = useSignMessage();

  const { disconnectAsync } = useDisconnect();

  useEffect(() => {
    if (!address || !isConnected || isLoading) return;

    startLoading();

    signMessageAsync({
      message: authMessage,
      account: address,
    }).catch((error) => {
      // -32002
      alert(`Error signing message: ${error.message}`);
      console.log(error, error.code);
      if (error.code === rejectSignMessageErrorCode) {
        disconnectAsync().then(() => {
          stopLoading();
        });
      }
    });
  }, [address, isConnected, isLoading]);

  useEffect(() => {
    if (!address || !signMessageData) return;

    const hexSignature = signMessageData;

    setTimeout(() => {
      authByWallet(address, hexSignature, walletTypes.METAMASK)
        .then(() => {
          router.replace("/");
        })
        .catch((error) => {
          alert(`Auth unsuccessful: ${error}`);
          disconnectAsync().then(() => {
            stopLoading();
          });
        });
    }, 1000);
  }, [address, signMessageData]);
  return (
    <div
      className={`${styles.login_popup_content} ${
        isLoading ? "" : styles.scale
      }`}
    >
      <W3mButton isLoading={isLoading} />
      {isLoading && (
        <div>
          <div className={styles.loader_container}>
            <LoaderSmall />
            <p className={styles.loader_container__par}>
              {signMessageData ? "Authorization" : "Connection"}
            </p>
          </div>
          {(isLoadingSignMessage || !signMessageData) && (
            <p className={styles.tooltip}>
              Please sign authorization message with your wallet
            </p>
          )}
        </div>
      )}
    </div>
  );
}
