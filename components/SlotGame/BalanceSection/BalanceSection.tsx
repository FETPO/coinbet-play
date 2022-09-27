import React from "react";
import Button from "../../Button/Button";
import { ChevronIcon } from "../../svgs/ChevronIcon";
import { EthIcon } from "../../svgs/EthIcon";
import { PlusIcon } from "../../svgs/PlusIcon";
import styles from "./BalanceSection.module.scss";

interface IBalanceSectionProps {
  collapseDown: boolean;
  setCollapseDown: (val: boolean) => void;
  setShowDepositModal: (val: boolean) => void;
}

const BalanceSection = ({
  collapseDown,
  setCollapseDown,
  setShowDepositModal
}: IBalanceSectionProps) => {
  return (
    <div className={styles["balance-section"]}>
      <div className={styles["main"]}>
        <div className={styles["main-left"]}>
          <div>
            <h3>Your Balancе</h3>
            <p>
              <EthIcon />
              1.02
            </p>
          </div>
          <div className={styles["divider"]}></div>
          <div>
            <h3>Rolls</h3>
            <p>102</p>
          </div>
        </div>
        <div className={styles["main-right"]}>
          <Button
            variant="primary"
            size="medium"
            icon={<PlusIcon />}
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </Button>
          <Button variant="secondary" size="medium">
            Withdraw
          </Button>
          <div
            className={`${styles["arrow-btn"]} ${
              collapseDown ? styles["opened"] : ""
            }`}
            onClick={() => setCollapseDown(!collapseDown)}
          >
            <ChevronIcon />
          </div>
        </div>
      </div>
      {collapseDown ? (
        <div className={styles["details"]}>
          <div>
            <h3>Price per roll:</h3>
            <p>
              <EthIcon />
              0.01
            </p>
          </div>
          <div>
            <h3>Reward Pool</h3>
            <p>16,911.5784 MATIC</p>
          </div>
          <div>
            <h3>Target payout:</h3>
            <p>~0 MATIC</p>
          </div>
          <div>
            <h3>Min bet amount:</h3>
            <p>1 MATIC</p>
          </div>
          <div>
            <h3>Max payout:</h3>
            <p>161.5784 MATIC</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BalanceSection;
