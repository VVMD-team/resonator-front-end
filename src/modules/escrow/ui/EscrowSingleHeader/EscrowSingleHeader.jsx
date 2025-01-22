import styles from "./EscrowSingleHeader.module.css";
import cn from "classnames";

import { useRouter } from "next/navigation";

import { TbChevronLeft } from "react-icons/tb";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import { escrowStatuses } from "@/modules/escrow/constants";

import Timer from "./Timer";

export default function EscrowSingleHeader() {
  const { escrow } = useEscrowSingle();

  const router = useRouter();
  const handleBack = () => {
    router.push("/escrow");
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__titleContainer}>
        <p className={styles.container__titleContainer__title}>
          <TbChevronLeft
            onClick={handleBack}
            className={styles.container__titleContainer__icon}
          />
          <soan
            className={cn(
              styles.container__titleContainer__title__text,
              "text-wrap"
            )}
          >
            {escrow.name}
          </soan>
        </p>

        {escrow.status === escrowStatuses.in_progress && <Timer />}
      </div>
    </div>
  );
}
