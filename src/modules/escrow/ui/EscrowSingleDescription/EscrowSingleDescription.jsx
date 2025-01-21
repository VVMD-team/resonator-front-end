import styles from "./EscrowSingleDescription.module.css";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";

import EscrowSingleLabel from "../EscrowSingleLabel";

export default function EscrowSingleDescription() {
  const { escrow } = useEscrowSingle();

  return (
    <div className={styles.container}>
      <EscrowSingleLabel title="Description" />

      <div className={styles.container__textContainer}>
        <p className={styles.container__textContainer__text}>
          {escrow.description}
        </p>
      </div>
    </div>
  );
}
