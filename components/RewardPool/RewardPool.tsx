import styles from "./RewardPool.module.scss";
import Head from "next/head";
import { MaticIcon } from "../svgs/MaticIcon";
import { InfoIcon } from "../svgs/InfoIcon";
import Button from "../Button/Button";
import { PlusIcon } from "../svgs/PlusIcon";
import { MinusIcon } from "../svgs/MinusIcon";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import LiquidityModal from "../Modal/LiquidityModal/LiquidityModal";
import Tooltip from "../Tooltip/Tooltip";
import { formatBigNumber, formatUsdPrice } from "../../utils/utility";
import { usePolygonScanContext } from "../../context/polygonscan.context";
import { BigNumber, ethers } from "ethers";
import { useContractsContext } from "../../context/contract.context";
import { useWalletContext } from "../../context/wallet.context";

const RewardPool = () => {
  const [showAddLiquidityModal, setShowAddLiquidityModal] = useState(false);
  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] =
    useState(false);
  const [housePoolBalance, setHousePoolBalance] = useState("0");
  const [userLpBalanceMatic, setUserLpBalanceMatic] = useState("0");
  const [userLpBalance, setUserLpBalance] = useState("0");
  const [userPercentOfPool, setUserPercentOfPool] = useState("0");
  const [lpTokenTotalSupply, setLpTokenTotalSupply] = useState("0");

  const { polygonScanData } = usePolygonScanContext();
  const { contracts } = useContractsContext();
  const { wallet, updateBalance } = useWalletContext();

  useEffect(() => {
    const housePoolBalance = async () => {
      const balance = await contracts?.coinbetHousePool.poolBalance();
      setHousePoolBalance(balance?.toString());
    };
    if (contracts) {
      housePoolBalance();
    }
  }, [contracts, contracts?.coinbetHousePool]);

  useEffect(() => {
    const userLpBalance = async () => {
      const lpBalance = await contracts?.coinbetHousePool.balanceOf(
        wallet?.address
      );
      const totalSupply = await contracts?.coinbetHousePool.totalSupply();
      const formatedUserLpBalance =
        (await contracts?.coinbetHousePool.callStatic.removeRewardsLiquidity(
          lpBalance
        )) || "0";

      setLpTokenTotalSupply(totalSupply);
      setUserLpBalance(lpBalance);
      setUserLpBalanceMatic(formatedUserLpBalance.toString());

      setUserPercentOfPool(
        BigNumber.from(lpBalance)
          .mul(BigNumber.from(10000))
          .div(BigNumber.from(totalSupply))
          .toString()
      );
    };
    if (contracts && wallet?.address) {
      userLpBalance();
    }
  }, [
    contracts,
    contracts?.coinbetHousePool,
    housePoolBalance,
    wallet?.address,
  ]);

  const handleModalClose = () => {
    setShowAddLiquidityModal(false);
    setShowRemoveLiquidityModal(false);
    updateBalance();
  };

  return (
    <>
      <Head>
        <title>Coinbet Play - House Pool</title>
        <meta name="description" content="House Pool description" />
      </Head>
      <div className={styles["reward-pool-wrapper"]}>
        <div className={styles["reward-pool-container"]}>
          <div className={styles["reward-pool-header"]}>
            <div className={styles["header-left"]}>
              <div>
                <MaticIcon />
              </div>
              <div>
                <h3>{formatBigNumber(BigNumber.from(housePoolBalance))}</h3>
                <p>
                  ${" "}
                  {formatUsdPrice(
                    polygonScanData?.maticPriceUsd,
                    BigNumber.from(housePoolBalance)
                  )}
                </p>
              </div>
            </div>
            <div className={styles["header-right"]}>
              <MaticIcon />
              Polygon
            </div>
          </div>
          <div className={styles["reward-pool-body"]}>
            <div className={styles["apy"]}>
              <div>
                APY
                <InfoIcon />
                <Tooltip text="APY is dynamic and it is based on the last epoch" />
              </div>
              <div>0.00%</div>
            </div>
            <div className={styles["staked-balance"]}>
              <div>Staked balance</div>
              <div>
                {formatBigNumber(BigNumber.from(userLpBalanceMatic))} MATIC
              </div>
            </div>
            <div className={styles["actions"]}>
              <Button
                variant="primary"
                size="medium"
                icon={<PlusIcon />}
                onClick={() => setShowAddLiquidityModal(true)}
              >
                Add Liquidity
              </Button>
              <Button
                variant="secondary"
                size="medium"
                icon={<MinusIcon />}
                onClick={() => setShowRemoveLiquidityModal(true)}
              >
                Withdraw Liquidity
              </Button>
            </div>
          </div>
          <div className={styles["reward-pool-footer"]}>
            <div>
              <h3>Your Rewards</h3>
              <p>
                <MaticIcon />
                0.00
              </p>
            </div>
            <div>
              <Button variant="primary" size="medium">
                Claim Rewards
              </Button>
            </div>
          </div>
        </div>
        <Modal open={showAddLiquidityModal} onClose={() => handleModalClose()}>
          <LiquidityModal
            onClose={() => handleModalClose()}
            type="add"
            userPercentOfPool={userPercentOfPool}
            housePoolBalance={housePoolBalance}
            userLpTokenBalance={userLpBalance}
            lpTokenTotalSupply={lpTokenTotalSupply}
          />
        </Modal>
        <Modal
          open={showRemoveLiquidityModal}
          onClose={() => handleModalClose()}
        >
          <LiquidityModal
            onClose={() => handleModalClose()}
            type="remove"
            userPercentOfPool={userPercentOfPool}
            housePoolBalance={housePoolBalance}
            userLpTokenBalance={userLpBalance}
            lpTokenTotalSupply={lpTokenTotalSupply}
          />
        </Modal>
      </div>
    </>
  );
};

export default RewardPool;
