import styles from "./AmountInfo.module.css";

import InfoBlock from "../InfoBlock";

export default function AmountInfo({ amount, currency }) {
  return (
    <div className={styles.container}>
      <InfoBlock title="Amount" text={amount} isSmallMobile />
      <InfoBlock title="Currency" text={currency} isSmallMobile />
    </div>
  );
}
