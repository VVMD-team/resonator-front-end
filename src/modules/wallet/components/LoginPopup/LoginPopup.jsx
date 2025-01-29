import styles from "./LoginPopup.module.css";

import Wrapper from "./Wrapper";
import WalletConnection from "./WalletConnection";

export default function LoginPopup({ loginPopupId }) {
  return (
    <Wrapper loginPopupId={loginPopupId}>
      <div id={loginPopupId} className={styles.login_popup}>
        <div className={styles.login_popup_background}></div>

        <WalletConnection />
      </div>
    </Wrapper>
  );
}
