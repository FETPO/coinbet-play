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
import {
  epochTerm,
  formatBigNumber,
  formatUsdPrice,
  setNewTime,
} from "../../utils/utils";
import { usePolygonScanContext } from "../../context/polygonscan.context";
import { BigNumber, ethers } from "ethers";
import { useContractsContext } from "../../context/contract.context";
import { useWalletContext } from "../../context/wallet.context";
import { useAlchemyContext } from "../../context/alchemy.context";
import LoadingModal from "../Modal/StatusModals/LoadingModal/LoadingModal";
import ErrorModal from "../Modal/StatusModals/ErrorModal/ErrorModal";
import { formatErrorString } from "../../utils/format";

const RewardPool = () => {
  const [showAddLiquidityModal, setShowAddLiquidityModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] =
    useState(false);
  const [housePoolBalance, setHousePoolBalance] = useState("0");
  const [userLpBalanceMatic, setUserLpBalanceMatic] = useState("0");
  const [userLpBalance, setUserLpBalance] = useState("0");
  const [userPercentOfPool, setUserPercentOfPool] = useState("0");
  const [lpTokenTotalSupply, setLpTokenTotalSupply] = useState("0");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { polygonScanData } = usePolygonScanContext();
  const { contracts } = useContractsContext();
  const { wallet, updateBalance } = useWalletContext();
  const { alchemy } = useAlchemyContext();

  useEffect(() => {
    const housePoolBalance = async () => {
      // const balance = await contracts?.coinbetHousePool.poolBalance();
      const balance = alchemy?.coinbetHousePoolData?.poolBalance;
      setHousePoolBalance(balance?.toString() || "0");
    };
    if (alchemy) {
      housePoolBalance();
    }
  }, [contracts, alchemy]);

  useEffect(() => {
    const userLpBalance = async () => {
      const lpBalance = await contracts?.coinbetHousePool?.balanceOf(
        wallet?.address
      );
      const totalSupply = await contracts?.coinbetHousePool?.totalSupply();
      const formatedUserLpBalance =
        (await contracts?.coinbetHousePool?.convertLiquidityToStakedToken(
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

  useEffect(() => {
    const interval = setInterval(() => {
      setNewTime(setCountdown, alchemy?.coinbetHousePoolData?.epochEndAt);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [alchemy?.coinbetHousePoolData?.epochEndAt]);

  const handleModalClose = () => {
    setShowAddLiquidityModal(false);
    setShowRemoveLiquidityModal(false);
    setShowLoadingModal(false);
    updateBalance();
  };

  const onLoadingModalClose = async () => {
    setShowLoadingModal(false);
  };

  const handleShowLoadingModal = async () => {
    setShowLoadingModal(true);
  };

  const handleShowErrorModal = async (errorMessage: string) => {
    setShowErrorModal(true);
    setErrorModalMessage(errorMessage);
  };

  const withdrawBalance = async () => {
    console.log(userLpBalance);
    try {
      const withdrawRewardsLiqidityTxn =
        await contracts?.coinbetHousePool.removeRewardsLiquidity(
          userLpBalance
        );
      setShowLoadingModal(true);
      await withdrawRewardsLiqidityTxn.wait();
      setShowLoadingModal(false);
    } catch (error: any) {
      setShowErrorModal(true);
      setErrorModalMessage(formatErrorString(error.reason));
    }

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
              <div>My staked balance</div>
              <div>
                {formatBigNumber(BigNumber.from(userLpBalanceMatic))} MATIC
              </div>
            </div>
            <div className={styles["epoch-term"]}>
              <div>Epoch Term</div>
              <div>
                {epochTerm(
                  alchemy?.coinbetHousePoolData?.epochStartedAt,
                  alchemy?.coinbetHousePoolData?.epochEndAt
                )}
              </div>
            </div>
            <div className={styles["epoch-ends"]}>
              <div>Epoch ends in</div>
              <div>
                {`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
              </div>
            </div>
            <div className={styles["epoch-period"]}>
              <div>Period</div>
              {alchemy?.coinbetHousePoolData?.hasEpochEnded ? (
                <div style={{ color: "#448BF4" }}>{`Withdrawals`}</div>
              ) : (
                <div style={{ color: "#00CE9D" }}>{`Epoch Running`}</div>
              )}
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
              <h3>My Balance</h3>
              <p>
                <MaticIcon />
                {formatBigNumber(BigNumber.from(userLpBalanceMatic))}
              </p>
            </div>
            <div>
              <Button variant="primary" size="medium" onClick={withdrawBalance}>
                Withdraw
              </Button>
            </div>
          </div>
        </div>
        <Modal open={showAddLiquidityModal} onClose={() => handleModalClose()}>
          <LiquidityModal
            onClose={() => handleModalClose()}
            onLoading={handleShowLoadingModal}
            onError={(errorMsg) => handleShowErrorModal(errorMsg)}
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
            onLoading={handleShowLoadingModal}
            onError={(errorMsg) => handleShowErrorModal(errorMsg)}
            type="remove"
            userPercentOfPool={userPercentOfPool}
            housePoolBalance={housePoolBalance}
            userLpTokenBalance={userLpBalance}
            lpTokenTotalSupply={lpTokenTotalSupply}
          />
        </Modal>
        <Modal
          open={showLoadingModal}
          onClose={() => setShowLoadingModal(false)}
        >
          <LoadingModal onClose={() => onLoadingModalClose()} />
        </Modal>
        <Modal
          open={showErrorModal}
          onClose={() => setShowErrorModal(false)}
        >
          <ErrorModal onClose={() => { setShowErrorModal(false); setErrorModalMessage("") }} errorMessage={errorModalMessage} />
        </Modal>
      </div>
    </>
  );
};

export default RewardPool;
