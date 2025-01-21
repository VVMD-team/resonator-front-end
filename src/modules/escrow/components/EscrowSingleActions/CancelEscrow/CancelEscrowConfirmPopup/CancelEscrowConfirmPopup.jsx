import styles from "./CancelEscrowConfirmPopup.module.css";

import Button from "@/ui/Button";

import EscrowPopup from "@/modules/escrow/ui/Popup";

export default function CancelEscrowConfirmPopup({ onClose, onConfirm }) {
  return (
    <EscrowPopup variant="small" withCloseButton={false} onClose={onClose}>
      <p className={styles.text}>Are you sure you want to cancel this deal?</p>
      <div className={styles.container}>
        <Button onClick={onConfirm} className={styles.container__button}>
          Yes
        </Button>
        <Button onClick={onClose} className={styles.container__button}>
          No
        </Button>
      </div>
    </EscrowPopup>
  );
}
