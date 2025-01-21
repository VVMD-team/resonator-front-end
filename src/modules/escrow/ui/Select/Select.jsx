import styles from "./Select.module.css";
import Select from "react-select";
import classNames from "classnames";

import { DropDownIcon } from "@/modules/escrow/components/icons";

import cn from "classnames";

const CustomSelect = ({
  options,
  value,
  onChange,
  type,
  name,
  placeholder,
  className,
  isError,
}) => {
  const selectClassName = classNames(styles.reactSelectContainer, {
    [styles.SelectPrimary]: type === "primary",
    [styles.SelectSecondary]: type === "secondary",
  });

  return (
    <Select
      className={cn(
        selectClassName,
        { [styles.errorBorder]: isError },
        className
      )}
      classNamePrefix="react-select"
      name={name}
      placeholder={placeholder}
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={onChange}
      isSearchable={false}
      unstyled
      components={{ DropdownIndicator: DropDownIcon }}
    />
  );
};

export default CustomSelect;
