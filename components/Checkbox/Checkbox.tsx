import React from "react";
import styles from "./Checkbox.module.scss";

interface ICheckboxProps {
  checked: boolean;
  setChecked: (val: boolean) => void;
  labelText?: string;
}

const Checkbox = ({ checked, setChecked, labelText }: ICheckboxProps) => {
  return (
    <label className={styles["container"]}>
      {labelText}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span className={styles["checkmark"]}></span>
    </label>
  );
};

export default Checkbox;
