import styles from "./RewardPool.module.scss";
import Head from "next/head";
import { EthIcon } from "../svgs/EthIcon";
import { InfoIcon } from "../svgs/InfoIcon";
import Button from "../Button/Button";
import { PlusIcon } from "../svgs/PlusIcon";
import { MinusIcon } from "../svgs/MinusIcon";
import Modal from "../Modal/Modal";
import { useState } from "react";
import LiquidityModal from "../Modal/LiquidityModal/LiquidityModal";
import Tooltip from "../Tooltip/Tooltip";

const RewardPool = () => {
  const [showAddLiquidityModal, setShowAddLiquidityModal] = useState(false);
  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] =
    useState(false);

  return (
    <>
      <Head>
        <title>Coinbet Play - Reward Pool</title>
        <meta name="description" content="Reward Pool description" />
      </Head>
      <div className={styles["reward-pool-wrapper"]}>
        <div className={styles["reward-pool-container"]}>
          <div className={styles["reward-pool-header"]}>
            <div className={styles["header-left"]}>
              <div>
                <EthIcon />
              </div>
              <div>
                <h3>24.230</h3>
                <p>$56,345.00</p>
              </div>
            </div>
            <div className={styles["header-right"]}>
              <EthIcon />
              Ethereum
            </div>
          </div>
          <div className={styles["reward-pool-body"]}>
            <div className={styles["apy"]}>
              <div>
                APY
                <InfoIcon />
                <Tooltip text="Pellentesque nunc nec et vel pellentesque interdum arcu" />
              </div>
              <div>124.97%</div>
            </div>
            <div className={styles["staked-balance"]}>
              <div>Staked balance</div>
              <div>0.00</div>
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
                Remove Liquidity
              </Button>
            </div>
          </div>
          <div className={styles["reward-pool-footer"]}>
            <div>
              <h3>Your Rewards</h3>
              <p>
                <EthIcon />
                0.867
              </p>
            </div>
            <div>
              <Button variant="primary" size="medium">
                Claim Rewards
              </Button>
            </div>
          </div>
        </div>
        <Modal
          open={showAddLiquidityModal}
          onClose={() => setShowAddLiquidityModal(false)}
        >
          <LiquidityModal
            onClose={() => setShowAddLiquidityModal(false)}
            type="add"
          />
        </Modal>
        <Modal
          open={showRemoveLiquidityModal}
          onClose={() => setShowRemoveLiquidityModal(false)}
        >
          <LiquidityModal
            onClose={() => setShowRemoveLiquidityModal(false)}
            type="remove"
          />
        </Modal>
      </div>
    </>
  );
};

export default RewardPool;
