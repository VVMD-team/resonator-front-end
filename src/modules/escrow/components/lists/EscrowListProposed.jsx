"use client";

import EscrowList from "@/modules/escrow/ui/EscrowList";

import { getProposedEscrows } from "@/modules/escrow/api";

import { useEffect, useState } from "react";
import { useLoading } from "@/lib/hooks";
export default function EscrowListProposed() {
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    startLoading();
    getProposedEscrows()
      .then((escrows) => {
        setList(escrows);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        stopLoading();
      });
  }, []);

  return !isLoading ? <EscrowList list={list} title="Incoming deals" /> : null;
}
