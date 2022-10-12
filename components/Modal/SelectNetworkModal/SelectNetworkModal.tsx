import React from "react";
import { IOption } from "../../../types/dropdown";
import styles from "./SelectNetworkModal.module.scss";

interface ISelectNetworkModalProps {
  onClose: () => void;
  options: IOption[];
  setSelectedOption: (val: IOption) => void;
  setShowDropdown: (val: boolean) => void;
  selectedOption: IOption;
}

const SelectNetworkModal = ({
  onClose,
  options,
  setSelectedOption,
  setShowDropdown,
  selectedOption
}: ISelectNetworkModalProps) => {
  return (
    <ul className={styles["dropdown-list"]}>
      {options.map((item) => {
        return (
          <li
            key={item.id}
            onClick={() => {
              setSelectedOption(item);
              setShowDropdown(false);
              onClose();
            }}
          >
            {item.icon || null}
            <span className={styles["dropdown-list-item-text"]}>
              {item.name}
            </span>
            {selectedOption.id === item.id ? (
              <span className={styles["selected-item-badge"]}></span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectNetworkModal;
