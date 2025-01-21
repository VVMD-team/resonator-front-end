import styles from "./EscrowSingleStatus.module.css";

import { escrowStatusesUIDataMap } from "@/modules/escrow/constants";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import EscrowSingleLabel from "../EscrowSingleLabel";
const statusUIPlug = {
  title: "Error: Invalid Status",
  color: "#ff5252",
};

export default function EscrowSingleStatus() {
  const { escrow } = useEscrowSingle();

  const status = escrow.status;

  const statusUI = escrowStatusesUIDataMap[status]
    ? escrowStatusesUIDataMap[status]
    : statusUIPlug;

  return (
    <div className={styles.container}>
      <EscrowSingleLabel title="Status" className="hide-mobile-landscape" />
      <div className={styles.container__indicator}>
        <div
          style={{ backgroundColor: statusUI.color }}
          className={styles.container__dot}
        ></div>
        <p className={styles.container__text}>{statusUI.title}</p>
      </div>
    </div>
  );
}
