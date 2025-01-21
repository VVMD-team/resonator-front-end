"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";

import { web3ModalConfig, wagmiConfig } from "@/config/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

const queryClient = new QueryClient();

createWeb3Modal(web3ModalConfig);

export function Providers({ children, initialState }) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
