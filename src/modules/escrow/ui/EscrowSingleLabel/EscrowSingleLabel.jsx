import styles from "./EscrowSingleLabel.module.css";
import cn from "classnames";

export default function EscrowSingleLabel({ title, className }) {
  return (
    <div className={cn(styles.label, className)}>
      <p>{title}</p>
    </div>
  );
}
