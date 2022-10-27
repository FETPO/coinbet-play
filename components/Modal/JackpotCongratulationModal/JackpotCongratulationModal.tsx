import Image from "next/image";
import React from "react";
import styles from "./JackpotCongratulationModal.module.scss";
import JackpotCongratsModalImg from "../../../assets/images/JackpotCongratsModalImg.png";
import { MaticIcon } from "../../svgs/MaticIcon";
import Button from "../../Button/Button";

interface IJackpotCongratulationModalProps {
  onClose: () => void;
}

const JackpotCongratulationModal = ({
  onClose
}: IJackpotCongratulationModalProps) => {
  return (
    <div className={styles["jackpot-congratulation-popup-content"]}>
      <Image src={JackpotCongratsModalImg} alt="CongratsModal" />
      <h1>Congratulations!</h1>
      <p>
        You won a jackpot
        <MaticIcon />
        <span>0.05</span>
      </p>
      <Button variant="outlined" size="medium" onClick={onClose}>
        Continue
      </Button>
    </div>
  );
};

export default JackpotCongratulationModal;
