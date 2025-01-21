"use client";

import styles from "./page.module.css";

import { useParams } from "next/navigation";

import { EscrowSingleProvider } from "@/modules/escrow/context/EscrowSingleContext";
import { EscrowSingleLoadingPopupProvider } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";

import EscrowSingleHeader from "@/modules/escrow/ui/EscrowSingleHeader";
import EscrowSingleStatus from "@/modules/escrow/ui/EscrowSingleStatus";
import EscrowSingleParticipants from "@/modules/escrow/ui/EscrowSingleParticipants";
import EscrowSingleDescription from "@/modules/escrow/ui/EscrowSingleDescription";
import EscrowSingleDetails from "@/modules/escrow/ui/EscrowSingleDetails";

import EscrowSingleActions from "@/modules/escrow/components/EscrowSingleActions";

export default function EscromSinglePage() {
  const params = useParams();

  return (
    <EscrowSingleProvider escrowId={params.escrowId}>
      <EscrowSingleLoadingPopupProvider>
        <div className={styles.container}>
          <EscrowSingleHeader />

          <div className={styles.content}>
            <EscrowSingleStatus />

            <EscrowSingleParticipants />

            <EscrowSingleDetails />

            <EscrowSingleDescription />

            <EscrowSingleActions />
          </div>
        </div>
      </EscrowSingleLoadingPopupProvider>
    </EscrowSingleProvider>
  );
}
