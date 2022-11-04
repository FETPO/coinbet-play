import styles from "./SlotGame.module.scss";
import Head from "next/head";
import { useState } from "react";
import Modal from "../Modal/Modal";
import DepositModal from "../Modal/DepositModal/DepositModal";
import LiveFeedSection from "./LiveFeedSection/LiveFeedSection";
import BalanceSection from "./BalanceSection/BalanceSection";
import CoinbetSlotsSection from "./CoinbetSlotsSection/CoinbetSlotsSection";

const SlotGame = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [collapseDown, setCollapseDown] = useState(true);

  return (
    <>
      <Head>
        <title>Coinbet Play - Slot Game</title>
        <meta name="description" content="Slot Game description" />
      </Head>
      <div className={styles["slot-game-wrapper"]}>
        <div className="container">
          <div className={styles["slot-game-grid"]}>
            <CoinbetSlotsSection />
            <div>
              <BalanceSection
                collapseDown={collapseDown}
                setCollapseDown={setCollapseDown}
                setShowDepositModal={setShowDepositModal}
              />
              <LiveFeedSection collapseDown={collapseDown} />
            </div>
          </div>
        </div>
        <Modal
          open={showDepositModal}
          onClose={() => setShowDepositModal(false)}
        >
          <DepositModal onClose={() => setShowDepositModal(false)} />
        </Modal>
      </div>
    </>
  );
};

export default SlotGame;
