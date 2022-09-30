import React from "react";
import { CloseIcon } from "../svgs/CloseIcon";
import styles from "./Input.module.scss";

interface IInputProps {
  placeholder?: string;
  value: string;
  setValue: (val: string) => void;
  error?: string;
  icon?: JSX.Element;
}

const Input = ({ placeholder, value, setValue, error, icon }: IInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={`${styles["input-wrapper"]} ${error ? styles["error"] : ""} ${
        icon ? styles["with-icon"] : ""
      }`}
    >
      {icon ? <div className={styles["input-icon"]}>{icon}</div> : null}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {value ? (
        <div
          className={styles["clear-input-value"]}
          onClick={() => setValue("")}
        >
          <CloseIcon />
        </div>
      ) : null}
      {error ? <p className={styles["error-message"]}>{error}</p> : null}
    </div>
  );
};

export default Input;
