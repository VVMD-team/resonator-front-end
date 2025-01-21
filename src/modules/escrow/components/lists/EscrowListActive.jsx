"use client";

import EscrowList from "@/modules/escrow/ui/EscrowList";

import { useEscrowsActive } from "@/modules/escrow/context/EscrowsActiveProvider";

export default function EscrowListActive() {
  const escrows = useEscrowsActive();

  return <EscrowList list={escrows} title="My deals" />;
}
