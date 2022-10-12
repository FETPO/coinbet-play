import React, { useState } from "react";
import { EthIcon } from "../../svgs/EthIcon";
import { InfoIcon } from "../../svgs/InfoIcon";
import styles from "./LiquidityModal.module.scss";
import Button from "../../Button/Button";
import Checkbox from "../../Checkbox/Checkbox";
import Tooltip from "../../Tooltip/Tooltip";

interface ILiquidityModalProps {
  onClose: () => void;
  type: "add" | "remove";
}

const LiquidityModal = ({ onClose, type }: ILiquidityModalProps) => {
  const balance = "20.123";
  const [liquidityValue, setLiquidityValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiquidityValue(e.target.value);
  };

  return (
    <div className={styles["liquidity-popup-content"]}>
      <div className={styles["info-icon"]}>
        <InfoIcon />
        <Tooltip text="Pellentesque nunc nec et vel pellentesque interdum arcu" />
      </div>
      <h1 className={styles["title"]}>
        {type === "add" ? "Add Liquidity" : "Remove Liquidity"}
      </h1>
      <div className={styles["liquidity-field-wrapper"]}>
        <div className={styles["input-field"]}>
          <input
            type="number"
            placeholder="0.00"
            value={liquidityValue}
            onChange={handleChange}
          />
          <span>
            <EthIcon />
            ETH
          </span>
        </div>
        <div className={styles["balance"]}>
          <div>$16,509.00</div>
          <div>
            <span onClick={() => setLiquidityValue(balance)}>MAX</span>
            <p>Balance: {balance}</p>
          </div>
        </div>
      </div>
      <div className={styles["details"]}>
        <div>
          <h3>Your Share of Pool</h3>
          <p>2.80%</p>
        </div>
        <span className={styles["divider"]}></span>
        <div>
          <h3>New TVL</h3>
          <p>
            <EthIcon />
            10.01
          </p>
        </div>
        {type === "remove" ? (
          <>
            <span className={styles["divider"]}></span>
            <div>
              <h3>Fee</h3>
              <p>
                <EthIcon />
                10.01
              </p>
            </div>
          </>
        ) : null}
      </div>
      <div className={styles["terms-conditions"]}>
        <Checkbox
          checked={checked}
          setChecked={setChecked}
          labelText="I accept the Terms and Conditions"
        />
      </div>
      <div className={styles["action"]}>
        {type === "remove" ? (
          <Button
            variant="primary"
            size="medium"
            disabled={!liquidityValue || !checked}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="primary"
            size="medium"
            disabled={!liquidityValue || !checked}
          >
            Supply
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiquidityModal;
