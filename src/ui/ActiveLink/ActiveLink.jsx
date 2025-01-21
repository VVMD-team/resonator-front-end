"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

const ActiveLink = ({
  children,
  activeClassName = "",
  exceptPathsNames = [],
  disabled = false,
  hasInnerMenu = false,
  className,
  ...props
}) => {
  const pathname = usePathname();

  if (disabled) {
    return <>{children}</>;
  }

  const path = props.href || props.as;

  const isActive = hasInnerMenu
    ? !exceptPathsNames.includes(pathname) && pathname.startsWith(path)
    : pathname === path;

  const linkClassName = isActive
    ? `${className} ${activeClassName}`.trim()
    : className;

  return (
    <Link prefetch={false} className={linkClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
