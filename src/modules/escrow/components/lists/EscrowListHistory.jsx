"use client";

import EscrowList from "@/modules/escrow/ui/EscrowList";

import { getHistory } from "@/modules/escrow/api";

import { useEffect, useState } from "react";
import { useLoading } from "@/lib/hooks";

export default function EscrowListHistory() {
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    startLoading();
    getHistory()
      .then((escrows) => {
        setList(escrows);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        stopLoading();
      });
  }, []);

  return !isLoading ? <EscrowList list={list} title="History" /> : null;
}
