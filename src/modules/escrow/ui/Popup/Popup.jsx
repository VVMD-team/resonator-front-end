import styles from "./Popup.module.css";
import cn from "classnames";

import { PopupCloseIcon } from "@/components/icons";

export default function Popup({
  children,
  variant, // 'small' | 'medium' | 'full_screen'
  overlayClassName,
  modalClassName,
  withCloseButton = true,
  onClose = () => {},
}) {
  const classNames = Array.isArray(variant)
    ? variant.map((v) => styles[v])
    : [styles[variant]];

  return (
    <div
      onClick={onClose}
      className={cn(...classNames, styles.overlay, overlayClassName)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(...classNames, styles.modal, modalClassName)}
      >
        {withCloseButton && (
          <button
            type="button"
            className={styles.modal__close}
            onClick={onClose}
          >
            <PopupCloseIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
