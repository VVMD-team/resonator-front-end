import styles from "./Actions.module.css";

import Button from "@/ui/Button";

import NewEscrow from "./NewEscrow";
import NotificationButton from "./NotificationButton";

export default function Actions() {
  return (
    <div className={styles.actions}>
      <div className={styles.actions__row}>
        <NewEscrow />
        <Button type="button" disabled>
          Dispute center
        </Button>
      </div>

      <NotificationButton />
    </div>
  );
}
