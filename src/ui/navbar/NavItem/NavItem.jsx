import styles from "./NavItem.module.css";

import Image from "next/image";

import ActiveLink from "@/ui/ActiveLink";

export default function NavItem({
  href,
  imageSrc,
  imageAlt = "",
  isComingSoon = false,
}) {
  return isComingSoon ? (
    <button type="button" className={styles.nav_item}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.nav_icon}
        loading="lazy"
      />
      <div className={styles.nav_item_tooltip}>Coming soon</div>
    </button>
  ) : (
    <ActiveLink
      href={href}
      className={styles.nav_item}
      activeClassName={styles.nav_item_active}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={100}
        height={100}
        className={styles.nav_icon}
        loading="lazy"
      />
      <span className="hide">Home</span>
    </ActiveLink>
  );
}
