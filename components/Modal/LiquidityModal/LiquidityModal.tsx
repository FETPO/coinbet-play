import React, { useEffect, useState } from "react";
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
import slotConfig from "../../../coinbet.config.json";

interface ILiquidityModalProps {
  onClose: () => void;
  type: "add" | "remove";
  userPercentOfPool: string;
  housePoolBalance: string;
  userLpTokenBalance: string;
  lpTokenTotalSupply: string;
}

const LiquidityModal = ({
  onClose,
  type,
  userPercentOfPool,
  housePoolBalance,
  userLpTokenBalance,
  lpTokenTotalSupply,
}: ILiquidityModalProps) => {
  const [liquidityValue, setLiquidityValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [newTVL, setNewTVL] = useState(housePoolBalance);
  const [newUserShareOfPool, setNewUserShareOfPool] =
    useState(userPercentOfPool);
  const [userLpBalanceToWithdraw, setUserLpBalanceToWithdraw] = useState("0");
  const [maticEquivalentAmount, setMaticEquivalentAmount] = useState("0");

  const { contracts } = useContractsContext();
  const { wallet } = useWalletContext();
  const { polygonScanData } = usePolygonScanContext();

  useEffect(() => {
    const getMaticEquivalentAmount = async () => {
      let maticEquivalentAmount =
        (await contracts?.coinbetHousePool.callStatic.removeRewardsLiquidity(
          userLpTokenBalance
        )) || "0";
      setMaticEquivalentAmount(maticEquivalentAmount.toString());
    };

    getMaticEquivalentAmount();
  }, [contracts?.coinbetHousePool.callStatic, userLpTokenBalance]);

  const handleChange = (value: string) => {
    setLiquidityValue(value);
    if (type === "add") {
      setNewTVL(
        ethers.utils
          .parseEther(value || "0")
          .add(BigNumber.from(housePoolBalance || "0"))
          .toString()
      );

      let newUserValueMatic = BigNumber.from(maticEquivalentAmount).add(
        ethers.utils.parseEther(value || "0")
      );
      let newTotalValueMatic = ethers.utils
        .parseEther(value || "0")
        .add(BigNumber.from(housePoolBalance || "0"));
      setNewUserShareOfPool(
        newUserValueMatic
          .mul(BigNumber.from(10000))
          .div(newTotalValueMatic)
          .toString()
      );
    } else if (type === "remove") {
      setNewTVL(
        BigNumber.from(housePoolBalance || "0")
          .sub(ethers.utils.parseEther(value || "0"))
          .toString()
      );
      let newUserValueMatic = BigNumber.from(maticEquivalentAmount).sub(
        ethers.utils.parseEther(value || "0")
      );
      let newTotalValueMatic = BigNumber.from(housePoolBalance || "0").sub(
        ethers.utils.parseEther(value || "0")
      );
      setNewUserShareOfPool(
        newUserValueMatic
          .mul(BigNumber.from(10000))
          .div(newTotalValueMatic)
          .toString()
      );

      let liquidity = BigNumber.from(ethers.utils.parseEther(value || "0"))
        .mul(BigNumber.from(lpTokenTotalSupply))
        .div(BigNumber.from(housePoolBalance));

      setUserLpBalanceToWithdraw(liquidity.toString());
    }
  };

  const handleAddRewardsLiquidityTxn = async () => {
    const addRewardsLiqidityTxn =
      await contracts?.coinbetHousePool.addRewardsLiquidity({
        value: ethers.utils.parseEther(liquidityValue),
      });
    await addRewardsLiqidityTxn.wait();
    onClose();
  };

  const handleWithdrawRewardsLiquidityTxn = async () => {
    const withdrawRewardsLiqidityTxn =
      await contracts?.coinbetHousePool.removeRewardsLiquidity(
        userLpBalanceToWithdraw
      );
    await withdrawRewardsLiqidityTxn.wait();
    onClose();
  };

  return (
    <div className={styles["liquidity-popup-content"]}>
      <div className={styles["info-icon"]}>
        <InfoIcon />
        <Tooltip text="Supply liquidity to the Coinbet House Pool" />
      </div>
      <h1 className={styles["title"]}>
        {type === "add" ? "Add Liquidity" : "Withdraw Liquidity"}
      </h1>
      <div className={styles["liquidity-field-wrapper"]}>
        <div className={styles["input-field"]}>
          <input
            type="number"
            placeholder="0.000"
            value={liquidityValue}
            onChange={(changeEvent) => handleChange(changeEvent.target.value)}
          />
          <span>
            <MaticIcon />
            MATIC
          </span>
        </div>
        <div className={styles["balance"]}>
          {type === "remove" ? (
            <div>
              ${" "}
              {formatUsdPrice(
                polygonScanData?.maticPriceUsd,
                BigNumber.from(maticEquivalentAmount || "0")
              )}
            </div>
          ) : (
            <div>
              ${" "}
              {formatUsdPrice(
                polygonScanData?.maticPriceUsd,
                BigNumber.from(wallet?.balance)
              )}
            </div>
          )}
          {type === "remove" ? (
            <>
              <div>
                <span
                  onClick={() =>
                    handleChange(
                      formatBigNumber(
                        BigNumber.from(maticEquivalentAmount || "0")
                      )
                    )
                  }
                >
                  MAX
                </span>
                <p>
                  Balance:{" "}
                  {formatBigNumber(
                    BigNumber.from(maticEquivalentAmount || "0")
                  )}
                </p>
              </div>
            </>
          ) : (
            <div>
              <span
                onClick={() => handleChange(formatBigNumber(wallet?.balance))}
              >
                MAX
              </span>
              <p>Balance: {formatBigNumber(wallet?.balance)}</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles["details"]}>
        <div>
          <h3>Your Share of Pool</h3>
          <p>{(parseFloat(newUserShareOfPool) / 100).toFixed(2)}%</p>
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
                {parseFloat(slotConfig.lpWithdrawFee) *
                  parseFloat(liquidityValue || "0")}
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
            onClick={handleWithdrawRewardsLiquidityTxn}
          >
            Withdraw
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
