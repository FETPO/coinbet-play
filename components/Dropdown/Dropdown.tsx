import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { IOption } from "../../types/dropdown";
import { ChevronIcon } from "../svgs/ChevronIcon";
import styles from "./Dropdown.module.scss";

interface IDropdownProps {
  options: IOption[];
  selectedOption: IOption;
  setSelectedOption: (value: IOption) => void;
}

const Dropdown = ({
  options,
  selectedOption,
  setSelectedOption,
}: IDropdownProps) => {
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useOnClickOutside(ref, () => setShowDropdown(false));

  return (
    <div className={styles["dropdown"]} ref={ref}>
      <div
        className={`${styles["selected-item"]} ${
          showDropdown ? styles["open"] : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectedOption.icon || null}
        <span>{selectedOption.name}</span>
        <ChevronIcon />
      </div>
      {showDropdown ? (
        <ul className={styles["dropdown-list"]}>
          {options.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedOption(item);
                  setShowDropdown(false);
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
      ) : null}
    </div>
  );
};

export default Dropdown;
