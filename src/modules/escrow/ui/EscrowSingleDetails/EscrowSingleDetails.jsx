import styles from "./EscrowSingleDetails.module.css";
import cn from "classnames";

import Image from "next/image";

import AmountInfo from "./info/AmountInfo";
import FileInfo from "./info/FileInfo";

import EscrowSingleLabel from "../EscrowSingleLabel";

import { escrowDealTypes, escrowStatuses } from "@/modules/escrow/constants";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import { useUser } from "@/modules/user/context/UserContext";

export default function EscrowSingleDetails() {
  const { escrow } = useEscrowSingle();
  const { user } = useUser();

  const isReversed = user.id === escrow.counterpartyAddress;

  const dealType = escrow.dealType;
  const ownerData = escrow.ownerData;
  const requestedCounterpartyData = escrow.requestedCounterpartyData;
  const counterpartyData = escrow.counterpartyData;

  return (
    <div className={styles.details}>
      <EscrowSingleLabel title="Details" className="hide-mobile-landscape" />

      <div
        className={cn(styles.details__content, {
          [styles.reversed]: isReversed,
        })}
      >
        {(dealType === escrowDealTypes.funds_to_funds ||
          dealType === escrowDealTypes.funds_to_file) && (
          <AmountInfo
            amount={ownerData.payment.amount}
            currency={ownerData.payment.currency}
          />
        )}
        {(dealType === escrowDealTypes.file_to_funds ||
          dealType === escrowDealTypes.file_to_file) && (
          <FileInfo fileName={ownerData.fileName} isPlaceholder={false} />
        )}

        <Image
          src="/images/arrowright.svg"
          width={31}
          height={31}
          alt=""
          className={styles.details__content__image}
        />

        {(dealType === escrowDealTypes.file_to_funds ||
          dealType === escrowDealTypes.funds_to_funds) && (
          <AmountInfo
            amount={requestedCounterpartyData.payment.amount}
            currency={requestedCounterpartyData.payment.currency}
          />
        )}

        {(dealType === escrowDealTypes.funds_to_file ||
          dealType === escrowDealTypes.file_to_file) && (
          <FileInfo
            fileName={
              escrow.status !== escrowStatuses.completed
                ? requestedCounterpartyData?.fileName
                : counterpartyData?.fileName
            }
            isPlaceholder={escrow.status !== escrowStatuses.completed}
          />
        )}
      </div>
    </div>
  );
}
