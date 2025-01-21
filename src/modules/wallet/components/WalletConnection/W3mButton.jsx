import { memo } from "react";

const buuttonWrapperStyles = {
  "--wui-color-accent-100": "transparent",
  "--wui-color-gray-glass-010": "transparent",
  "--wui-color-accent-090": "transparent", // hover color
  "--wui-color-accent-080": "transparent", // active color
  "--wui-border-radius-m": "1.3125rem", // active color
  "--wui-font-family": "Helvetica Now Display, sans-serif",
  "--wui-font-size-paragraph": "1.5rem",
};

const buttonProps = {
  disabled: false,
  balance: "hide",
  size: "md",
  label: "Connect Wallet",
};

const W3mButton = memo(({ isLoading }) => {
  return (
    <div
      style={{
        ...buuttonWrapperStyles,
        display: isLoading ? "none" : "block",
      }}
    >
      <w3m-button {...buttonProps} />
    </div>
  );
});

export default W3mButton;
