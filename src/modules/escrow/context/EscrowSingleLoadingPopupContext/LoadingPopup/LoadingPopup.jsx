import styles from "./LoadingPopup.module.css";

import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";
import EscrowPopup from "@/modules/escrow/ui/Popup";

export default function LoadingPopup({ message }) {
  return (
    <EscrowPopup variant="small" withCloseButton={false}>
      <p className={styles.text}>{message}</p>
      <div className={styles.container}>
        <LoaderSmall width={40} height={40} thickness={6} />
      </div>
    </EscrowPopup>
  );
}
