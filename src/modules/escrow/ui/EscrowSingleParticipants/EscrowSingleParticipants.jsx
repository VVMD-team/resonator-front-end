import styles from "./EscrowSingleParticipants.module.css";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import { useUser } from "@/modules/user/context/UserContext";

import ShortMobName from "@/components/ShortMobName";
import EscrowSingleLabel from "../EscrowSingleLabel";

const mobNameParams = {
  breakpoint: 479,
  formatShorterParams: {
    start: 8,
    end: 5,
  },
};

export default function EscrowSingleParticipants() {
  const { escrow } = useEscrowSingle();
  const { user } = useUser();

  const isCounterparty =
    user.id.toLowerCase() === escrow.counterpartyAddress.toLowerCase();

  return (
    <div className={styles.container}>
      <EscrowSingleLabel
        title="Participants"
        className="hide-mobile-landscape"
      />
      <div className={styles.container__content}>
        <div className={styles.container__content__item}>
          <p className={styles.container__content__item_title}>
            {isCounterparty ? "Counterparty" : "Your address"}
            {/* Your address */}
          </p>
          <p className={styles.container__content__item_address}>
            <ShortMobName {...mobNameParams} name={escrow.ownerId} />
          </p>
        </div>
        <div className={styles.container__content__item}>
          <p className={styles.container__content__item_title}>
            {isCounterparty ? "Your address" : "Counterparty"}
            {/* Counterparty */}
          </p>
          <p className={styles.container__address}>
            <ShortMobName
              {...mobNameParams}
              name={escrow.counterpartyAddress}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
