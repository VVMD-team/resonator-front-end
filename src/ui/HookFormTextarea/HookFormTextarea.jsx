import styles from "./HookFormTextarea.module.css";
import cn from "classnames";

export default function HookFormTextarea({
  register,
  name,
  className,
  isError,
  ...props
}) {
  return (
    <textarea
      {...register(name)}
      className={cn(
        styles.textarea,
        { [styles.errorBorder]: isError },
        className
      )}
      {...props}
    ></textarea>
  );
}
