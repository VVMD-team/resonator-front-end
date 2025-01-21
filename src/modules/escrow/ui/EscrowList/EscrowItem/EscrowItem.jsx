import styles from "./EscrowItem.module.css";

import Link from "next/link";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

export default function EscrowItem({ id, name }) {
  const href = `/escrow/${id}`;

  return (
    <Link href={href} className={styles.link}>
      <div className={styles.content}>
        <span className={styles.icon}>
          <Image src="/images/np_handshake.svg" width={22} height={22} alt="" />
        </span>
        <p>{name}</p>
      </div>
      <BsThreeDots className={styles.trippledots} />
    </Link>
  );
}
