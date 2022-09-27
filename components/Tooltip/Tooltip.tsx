import React from "react";
import styles from "./Tooltip.module.scss";

interface ITooltipProps {
  text: string;
}

const Tooltip = ({ text }: ITooltipProps) => {
  return <span className={styles["copied-text"]}>{text}</span>;
};

export default Tooltip;
