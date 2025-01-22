"use client";

import styles from "./WalletBalance.module.css";
import cn from "classnames";

import { useState, useEffect, memo } from "react";
import { getWalletBalance } from "@/modules/user/api";
import { walletBalanceCurrencies } from "@/lib/constants";

import { useBalance, useAccount } from "wagmi";

import { useEscrowMainPageView } from "@/modules/escrow/context/EscrowMainPageViewContext";

import Select from "@/modules/escrow/ui/Select/Select";

import { mainnet } from "wagmi/chains";

import { ethers } from "ethers";

const options = [
  { value: walletBalanceCurrencies.ETH, label: "Ethereum" },
  { value: walletBalanceCurrencies.WBTC, label: "WBTC" },
  { value: walletBalanceCurrencies.USDT, label: "USDT (ERC-20)" },
  { value: walletBalanceCurrencies.USDC, label: "USDC (ERC-20)" },
];

const walletBalanceTokensMap = {
  [walletBalanceCurrencies.ETH]: null,
  [walletBalanceCurrencies.WBTC]: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  [walletBalanceCurrencies.USDT]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  [walletBalanceCurrencies.USDC]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

function convertBigIntToDecimal(bigIntValue, decimals) {
  // Convert bigint to string
  const strValue = bigIntValue.toString();

  // Ensure the string has enough length to insert the decimal point
  if (strValue.length <= decimals) {
    return "0." + strValue.padStart(decimals, "0");
  }

  // Insert decimal at the correct position
  const integerPart = strValue.slice(0, -decimals);
  const decimalPart = strValue.slice(-decimals);

  return parseFloat(`${integerPart}.${decimalPart}`);
}

export default memo(function WalletBalance() {
  const { view } = useEscrowMainPageView();

  const [balance, setBalance] = useState("Loading...");
  const [currency, setCurrency] = useState(walletBalanceCurrencies.WBTC);

  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: mainnet.id,
    token: walletBalanceTokensMap[currency],
  });

  console.log({
    currency,
    data,
    isError,
    isLoading,
  });
  // const fetchWalletBalance = async (selectedCurrency) => {
  //   try {
  //     const result = await getWalletBalance(selectedCurrency);
  //     setBalance(result || "none");
  //   } catch (error) {
  //     console.error("Failed to fetch wallet balance:", error);
  //     setBalance("Error");
  //   }
  // };

  // useEffect(() => {
  //   fetchWalletBalance(currency);
  // }, [currency]);

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
          <span className={styles.container__box__par__text2}>
            {data?.value && convertBigIntToDecimal(data.value).toString()}
          </span>
        </p>
      </div>
    </div>
  );
});
