import styles from "./Checkbox.module.css";

import cn from "classnames";

export default function Checkbox({
  label,
  checked,
  onChange,
  id,
  className,
  labelClassName,
  disabled
}) {
  return (
    <div className={cn(styles.checkboxContainer, className)}>
      {label && (
        <label htmlFor={id} className={cn(styles.labelText, labelClassName)}>
          {label}
        </label>
      )}

      <input
        type="checkbox"
        id={id}
        className={styles.checkboxInput}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        disabled={disabled}
      />
      <label htmlFor={id} className={styles.checkboxLabel}></label>
    </div>
  );
}
