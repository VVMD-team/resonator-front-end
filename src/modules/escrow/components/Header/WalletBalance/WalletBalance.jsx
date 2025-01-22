"use client";

import styles from "./WalletBalance.module.css";
import cn from "classnames";

import { useState, memo } from "react";

import { walletBalanceCurrencies, tokenAddresesMap } from "@/lib/constants";

import { useBalance, useAccount } from "wagmi";

import { useEscrowMainPageView } from "@/modules/escrow/context/EscrowMainPageViewContext";

import Select from "@/modules/escrow/ui/Select/Select";

import { mainnet } from "wagmi/chains";

const options = [
  { value: walletBalanceCurrencies.ETH, label: "Ethereum" },
  { value: walletBalanceCurrencies.WBTC, label: "WBTC" },
  { value: walletBalanceCurrencies.USDT, label: "USDT (ERC-20)" },
  { value: walletBalanceCurrencies.USDC, label: "USDC (ERC-20)" },
];

export default memo(function WalletBalance() {
  const { view } = useEscrowMainPageView();

  const [currency, setCurrency] = useState(walletBalanceCurrencies.WBTC);

  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: mainnet.id,
    token: tokenAddresesMap[currency],
  });

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
            {data?.value && convertBigIntToDecimal(data.value, 16).toString()}
          </span>
        </p>
      </div>
    </div>
  );
});
