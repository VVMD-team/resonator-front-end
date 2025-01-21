import styles from "./NavContainer.module.css";

export default function NavContainer({ children }) {
  return <div className={styles.nav_component}>{children}</div>;
}
