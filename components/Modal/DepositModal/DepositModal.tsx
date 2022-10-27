import React, { useState } from "react";
import Button from "../../Button/Button";
import { MaticIcon } from "../../svgs/MaticIcon";
import styles from "./DepositModal.module.scss";

interface IDepositModalProps {
  onClose: () => void;
}

const DepositModal = ({ onClose }: IDepositModalProps) => {
  const balance = "20.123";
  const [depositValue, setDepositValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositValue(e.target.value);
  };

  return (
    <div className={styles["deposit-popup-content"]}>
      <h1>Deposit Funds</h1>
      <div className={styles["deposit-field-wrapper"]}>
        <div className={styles["input-field"]}>
          <input
            type="number"
            placeholder="0.00"
            value={depositValue}
            onChange={handleChange}
          />
          <span>
            <MaticIcon />
            MATIC
          </span>
        </div>
        <div className={styles["balance"]}>
          <div>$16,509.00</div>
          <div>
            <span onClick={() => setDepositValue(balance)}>MAX</span>
            <p>Balance: {balance}</p>
          </div>
        </div>
      </div>
      <div className={styles["confirm-btn"]}>
        <Button variant="primary" size="medium" disabled={!depositValue}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DepositModal;
