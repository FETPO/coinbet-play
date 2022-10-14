import React from "react";
import Button from "../../../Button/Button";
import { GreenCheckIcon } from "../../../svgs/GreenCheckIcon";
import styles from "./CongratsModal.module.scss";

interface ICongratsModalProps {
  onClose?: () => void;
}

const CongratsModal = ({ onClose }: ICongratsModalProps) => {
  return (
    <div className={styles["congrats-popup-content"]}>
      <div className={styles["congrats-icon"]}>
        <GreenCheckIcon />
      </div>
      <h1>Congratulations!</h1>
      <p>Your transaction has been confirmed.</p>
      <Button variant="outlined" size="medium">
        View on Etherscan
      </Button>
    </div>
  );
};

export default CongratsModal;
