"use client";

import styles from "./BurnButton.module.css";

import Button from "@/ui/Button";

import { useEffect, useState, useRef } from "react";

const buttonDefaultProps = {
  type: "button",
  variant: ["primary", "small"],
  className: "inspector-button",
};

const buttonTitle = "Burn";

export default function BurnButton({ onClick, isDisabled }) {
  const eventMaskRef = useRef(null);

  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const openTooltip = () => setIsOpenTooltip(true);

  const toggleTooltip = () => setIsOpenTooltip((prev) => !prev);

  const closeTooltip = () => setIsOpenTooltip(false);

  const closeTooltipWithTargetCheck = (e) => {
    if (e.target !== eventMaskRef.current) {
      setIsOpenTooltip(false);
    }
  };

  useEffect(() => {
    if (isOpenTooltip) {
      window.addEventListener("click", closeTooltipWithTargetCheck);
    }
    return () => {
      window.removeEventListener("click", closeTooltipWithTargetCheck);
    };
  }, [isOpenTooltip]);

  return isDisabled ? (
    <div className={styles.relative}>
      <Button {...buttonDefaultProps} disabled={true}>
        {buttonTitle}
      </Button>
      <div
        ref={eventMaskRef}
        className={styles.eventMask}
        onClick={toggleTooltip}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
      />
      {isOpenTooltip && (
        <div className={styles.tooltip}>
          You can't burn this file when deal is in progress
        </div>
      )}
    </div>
  ) : (
    <Button {...buttonDefaultProps} onClick={onClick}>
      {buttonTitle}
    </Button>
  );
}
