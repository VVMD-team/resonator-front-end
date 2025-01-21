import styles from "./Header.module.css";

import WalletBalance from "./WalletBalance";
import Actions from "./Actions";

export default function Header() {
  return (
    <div className={styles.container}>
      <Actions />
      <WalletBalance />
    </div>
  );
}
