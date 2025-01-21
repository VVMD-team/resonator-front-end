import styles from "./FieldError.module.css";
import cn from "classnames";

export default function FieldError({ message, className }) {
  return message ? (
    <p className={cn(styles.error, className)}>{message}</p>
  ) : null;
}
