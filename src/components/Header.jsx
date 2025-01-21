"use client";

import { formatStringShorter } from "@/lib/helpers";
import { useState, useEffect } from "react";
import { getWalletBalance } from "@/modules/user/api";

import { useAccount } from "wagmi";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { walletBalanceCurrencies } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { address } = useAccount();
  const [accountBalance, setAccountBalance] = useState(0);

  const isShowBackButton =
    pathname.startsWith("/boxes") || pathname.startsWith("/files/inspector");

  const verticalClassName = pathname === "/account" ? "is-vertical" : "";

  useEffect(() => {
    getWalletBalance(walletBalanceCurrencies.RSN)
      .then((balance) => {
        setAccountBalance(balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <header className={`header_component ${verticalClassName}`}>
      {isShowBackButton ? (
        <button onClick={() => router.back()} className="header_back">
          &lt; Back
        </button>
      ) : (
        <Link href="/" aria-current="page" className="header_logo">
          <img
            src="/images/logo.svg"
            loading="lazy"
            alt="Resonator logotype"
            className="header_logo_image"
          />
        </Link>
      )}
      <Link href="/account" className={`header_account ${verticalClassName}`}>
        <div className={`header_account_avatar ${verticalClassName}`}>
          <img
            src="/images/logo-square.svg"
            loading="lazy"
            alt="Resonator logotype"
            className="header_account_image"
          />
        </div>
        <div id="account-id" className="header_account_caption">
          {address ? formatStringShorter(address) : "xxxx...xxx"}
        </div>
      </Link>
      <div className={`header_amount ${verticalClassName}`}>
        <img
          src="/images/amount-icon.svg"
          loading="lazy"
          alt="three white circles are placed in the shape of a triangle"
          className="header_balance_icon"
        />
        <div id="balance-amount" className="header_balance_amount">
          {accountBalance}
        </div>
        <div className="header_balance_units">RSN</div>
      </div>
    </header>
  );
}
