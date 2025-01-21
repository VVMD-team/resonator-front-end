import styles from "./Button.module.css";
import Link from "next/link";
import cn from "classnames";

export default function Button({
  children,
  link,
  className,
  variant = "primary", // 'primary' | 'secondary' | 'tertinary' | 'quarter'
  ...props
}) {
  const classNames = Array.isArray(variant)
    ? variant.map((v) => styles[v])
    : [styles[variant]];

  const finalClassName = cn(...classNames, styles.button, className);

  if (link) {
    return (
      <Link href={link} className={finalClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
