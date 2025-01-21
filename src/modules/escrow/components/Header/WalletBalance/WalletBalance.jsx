"use client";

import styles from "./WalletBalance.module.css";
import cn from "classnames";

import { useState, useEffect, memo } from "react";
import { getWalletBalance } from "@/modules/user/api";
import { walletBalanceCurrencies } from "@/lib/constants";

import { useEscrowMainPageView } from "@/modules/escrow/context/EscrowMainPageViewContext";

import Select from "@/modules/escrow/ui/Select/Select";

const options = [
  { value: walletBalanceCurrencies.ETH, label: "Ethereum" },
  { value: walletBalanceCurrencies.WBTC, label: "WBTC" },
  { value: walletBalanceCurrencies.USDT, label: "USDT (ERC-20)" },
  { value: walletBalanceCurrencies.USDC, label: "USDC (ERC-20)" },
];

export default memo(function WalletBalance() {
  const { view } = useEscrowMainPageView();

  const [balance, setBalance] = useState("Loading...");
  const [currency, setCurrency] = useState(walletBalanceCurrencies.WBTC);

  const fetchWalletBalance = async (selectedCurrency) => {
    try {
      const result = await getWalletBalance(selectedCurrency);
      setBalance(result || "none");
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
      setBalance("Error");
    }
  };

  useEffect(() => {
    fetchWalletBalance(currency);
  }, [currency]);

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.hiddenMobile]: view === "mob_notifications",
      })}
    >
      <Select
        options={options}
        value={currency}
        onChange={handleCurrencyChange}
        type="primary"
        className={styles.container__select}
      />

      <div className={styles.container__box}>
        <p className={styles.container__box__par}>
          <span className={styles.container__box__par__text1}>Amount: </span>
          <span className={styles.container__box__par__text2}>{balance}</span>
        </p>
      </div>
    </div>
  );
});
