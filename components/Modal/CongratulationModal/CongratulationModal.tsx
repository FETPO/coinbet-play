import React from "react";
import Button from "../../Button/Button";
import styles from "./CongratulationModal.module.scss";
import CongratsModalImg from "../../../assets/images/CongratsModalImg.png";
import Image from "next/image";
import { MaticIcon } from "../../svgs/MaticIcon";

interface ICongratulationModalProps {
  onClose: () => void;
}

const CongratulationModal = ({ onClose }: ICongratulationModalProps) => {
  return (
    <div className={styles["congratulation-popup-content"]}>
      <Image src={CongratsModalImg} alt="CongratsModal" />
      <h1>Congratulations!</h1>
      <p>
        You won
        <MaticIcon />
        <span>0.05</span>
      </p>
      <Button variant="outlined" size="medium" onClick={onClose}>
        Continue
      </Button>
    </div>
  );
};

export default CongratulationModal;
