import styles from "./HookFormInput.module.css";
import cn from "classnames";

export default function HookFormInput({
  register,
  name,
  className,
  disabled,
  control,
  isError,
  type,
  ...props
}) {
  return !disabled ? (
    <input
      type={type ? type : "text"}
      {...register(name)}
      {...props}
      className={cn(styles.input, { [styles.errorBorder]: isError }, className)}
    />
  ) : (
    <input
      type={type ? type : "text"}
      className={styles.inactive}
      disabled
      {...props}
    />
  );
}
