import React, { useState } from "react";
import { MaticIcon } from "../../svgs/MaticIcon";
import { InfoIcon } from "../../svgs/InfoIcon";
import styles from "./LiquidityModal.module.scss";
import Button from "../../Button/Button";
import Checkbox from "../../Checkbox/Checkbox";
import Tooltip from "../../Tooltip/Tooltip";
import { useContractsContext } from "../../../context/contract.context";
import { BigNumber, ethers } from "ethers";
import { useWalletContext } from "../../../context/wallet.context";
import { formatBigNumber, formatUsdPrice } from "../../../utils/utility";
import { usePolygonScanContext } from "../../../context/polygonscan.context";

interface ILiquidityModalProps {
  onClose: () => void;
  type: "add" | "remove";
  userPercentOfPool: string;
  housePoolBalance: string;
  userLpBalanceMatic: string;
}

const LiquidityModal = ({
  onClose,
  type,
  userPercentOfPool,
  housePoolBalance,
  userLpBalanceMatic,
}: ILiquidityModalProps) => {
  const [liquidityValue, setLiquidityValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [newTVL, setNewTVL] = useState(housePoolBalance);
  const [newUserShareOfPool, setNewUserShareOfPool] = useState(
    parseFloat(userPercentOfPool)
  );

  const { contracts } = useContractsContext();
  const { wallet } = useWalletContext();
  const { polygonScanData } = usePolygonScanContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiquidityValue(e.target.value);
    setNewTVL(
      ethers.utils
        .parseEther(e.target.value || "0")
        .add(BigNumber.from(housePoolBalance || "0"))
        .toString()
    );

    let newUserValueMatic = BigNumber.from(userLpBalanceMatic).add(
      BigNumber.from(ethers.utils.parseEther(e.target.value || "0"))
    );
    let newTotalValueMatic = ethers.utils
      .parseEther(e.target.value || "0")
      .add(BigNumber.from(housePoolBalance || "0"));
    setNewUserShareOfPool(
      parseInt(newUserValueMatic.toHexString(), 16) /
        parseInt(newTotalValueMatic.toHexString(), 16)
    );
  };

  const handleAddRewardsLiquidityTxn = async () => {
    const addRewardsLiqidityTxn =
      await contracts?.coinbetHousePool.addRewardsLiquidity({
        value: ethers.utils.parseEther(liquidityValue),
      });
    await addRewardsLiqidityTxn.wait();
    onClose();
  };

  return (
    <div className={styles["liquidity-popup-content"]}>
      <div className={styles["info-icon"]}>
        <InfoIcon />
        <Tooltip text="Supply liquidity to the Coinbet House Pool" />
      </div>
      <h1 className={styles["title"]}>
        {type === "add" ? "Add Liquidity" : "Remove Liquidity"}
      </h1>
      <div className={styles["liquidity-field-wrapper"]}>
        <div className={styles["input-field"]}>
          <input
            type="number"
            placeholder="0.000"
            value={liquidityValue}
            onChange={handleChange}
          />
          <span>
            <MaticIcon />
            MATIC
          </span>
        </div>
        <div className={styles["balance"]}>
          <div>
            ${" "}
            {formatUsdPrice(
              polygonScanData?.maticPriceUsd,
              BigNumber.from(wallet?.balance)
            )}
          </div>
          <div>
            <span
              onClick={() =>
                setLiquidityValue(formatBigNumber(wallet?.balance))
              }
            >
              MAX
            </span>
            <p>Balance: {formatBigNumber(wallet?.balance)}</p>
          </div>
        </div>
      </div>
      <div className={styles["details"]}>
        <div>
          <h3>Your Share of Pool</h3>
          <p>{(newUserShareOfPool * 100).toFixed(2)}%</p>
        </div>
        <span className={styles["divider"]}></span>
        <div>
          <h3>New TVL</h3>
          <p>
            <MaticIcon />
            {formatBigNumber(BigNumber.from(newTVL))}
          </p>
        </div>
        {type === "remove" ? (
          <>
            <span className={styles["divider"]}></span>
            <div>
              <h3>Fee</h3>
              <p>
                <MaticIcon />
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
            onClick={handleAddRewardsLiquidityTxn}
          >
            Supply
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiquidityModal;
