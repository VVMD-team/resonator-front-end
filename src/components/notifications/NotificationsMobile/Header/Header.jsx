import styles from "./Header.module.css";

import Image from "next/image";

import { useEscrowMainPageView } from "@/modules/escrow/context/EscrowMainPageViewContext";

export default function Header() {
  const { changeView } = useEscrowMainPageView();

  const handleChangeView = () => {
    changeView("main");
  };

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.header__button}
        onClick={handleChangeView}
      >
        <Image
          src="/images/np_back.svg"
          width={24}
          height={24}
          alt="Back Icon"
          className={styles.header__button__image}
        />
      </button>

      <h2 className={styles.header__title}>Notifications</h2>
    </div>
  );
}
