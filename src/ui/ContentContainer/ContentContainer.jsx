"use client";

import styles from "./ContentContainer.module.css";

import { usePathname } from "next/navigation";
import cn from "classnames";

export default function ContentContainer({ children }) {
  const pathname = usePathname();

  const inspectorPageClassname = pathname.includes("/inspector")
    ? styles.inspector
    : "";

  return (
    <div className={cn(styles.content, inspectorPageClassname)}>{children}</div>
  );
}
