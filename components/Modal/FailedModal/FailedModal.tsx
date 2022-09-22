import React from "react";
import Button from "../../Button/Button";
import { RedFailIcon } from "../../svgs/RedFailIcon";
import styles from "./FailedModal.module.scss";

interface IFailedModalProps {
  onClose?: () => void;
}

const FailedModal = ({ onClose }: IFailedModalProps) => {
  return (
    <div className={styles["failed-popup-content"]}>
      <div className={styles["failed-icon"]}>
        <RedFailIcon />
      </div>
      <h1>Sorry!</h1>
      <p>Your transaction has failed. Please go back and try again.</p>
      <Button variant="outlined" size="medium" onClick={onClose}>
        Go Back
      </Button>
    </div>
  );
};

export default FailedModal;
