import styles from "./LoginPopup.module.css";
import WalletConnection from "../WalletConnection";

export default function LoginPopup({ id }) {
  return (
    <div id={id} className={styles.login_popup}>
      <div className={styles.login_popup_background}></div>

      <WalletConnection />
    </div>
  );
}
