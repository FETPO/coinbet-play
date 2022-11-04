import React from "react";
import { useWalletContext } from "../../../context/wallet.context";
import { formatBigNumber } from "../../../utils/utility";
import Button from "../../Button/Button";
import { ChevronIcon } from "../../svgs/ChevronIcon";
import { MaticIcon } from "../../svgs/MaticIcon";
import { PlusIcon } from "../../svgs/PlusIcon";
import { SlotGameIcon } from "../../svgs/SlotGameIcon";
import styles from "./BalanceSection.module.scss";
import slotConfig from "../../../coinbet.config.json";
import { BigNumber, ethers } from "ethers";
import { useAlchemyContext } from "../../../context/alchemy.context";

interface IBalanceSectionProps {
  collapseDown: boolean;
  setCollapseDown: (val: boolean) => void;
  setShowDepositModal: (val: boolean) => void;
}

const BalanceSection = ({
  collapseDown,
  setCollapseDown,
  setShowDepositModal,
}: IBalanceSectionProps) => {
  const { wallet } = useWalletContext();
  const { alchemy } = useAlchemyContext();
  return (
    <div className={styles["balance-section"]}>
      <div className={styles["main"]}>
        <div className={styles["main-left"]}>
          <div>
            <h3>Your Balancе</h3>
            <p>
              <MaticIcon />
              {formatBigNumber(wallet?.balance)}
            </p>
          </div>
          <div className={styles["divider"]}></div>
          <div>
            <h3>Min Bet</h3>
            <p>
              <MaticIcon />
              {formatBigNumber(alchemy?.coinbetGameData?.minBetAmount)}
            </p>
          </div>
          <div className={styles["divider"]}></div>
          <div>
            <h3>Max Bet</h3>
            <p>
              <MaticIcon />
              {formatBigNumber(
                alchemy?.coinbetHousePoolData?.availableFundsForPayroll.div(
                  BigNumber.from(slotConfig.maxMultiplier)
                )
              )}
            </p>
          </div>
          <div className={styles["divider"]}></div>
          <div>
            <h3>Max Spins</h3>
            <p>
              {(
                parseFloat(ethers.utils.formatUnits(wallet?.balance || 0, 18)) /
                parseFloat(
                  ethers.utils.formatUnits(
                    alchemy?.coinbetGameData?.minBetAmount || 0,
                    18
                  )
                )
              ).toFixed(0)}
            </p>
          </div>
          {/* <div className={styles["divider"]}></div>
          <div>
            <h3>RTP</h3>
            <p>{slotConfig.rtp}</p>
          </div> */}
        </div>
        <div className={styles["main-right"]}>
          {/* <Button
            variant="primary"
            size="medium"
            icon={<SlotGameIcon />}
            onClick={() => setShowDepositModal(true)}
          >
            Spin Now
          </Button> */}
          {/* <Button variant="secondary" size="medium">
            Withdraw
          </Button> */}
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
            <h3>House Pool</h3>
            <p>
              {" "}
              {formatBigNumber(alchemy?.coinbetHousePoolData?.poolBalance)}{" "}
              MATIC
            </p>
          </div>
          {/* <div>
            <h3>Target payout:</h3>
            <p>~0 MATIC</p>
          </div> */}
          {/* <div>
            <h3>Min bet amount:</h3>
            <p>1 MATIC</p>
          </div> */}
          <div>
            <h3>Max payout:</h3>
            <p>
              {" "}
              {formatBigNumber(
                alchemy?.coinbetHousePoolData?.availableFundsForPayroll
              )}{" "}
              MATIC
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BalanceSection;
