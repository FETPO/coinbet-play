import styles from "./SlotGame.module.scss";
import Head from "next/head";
import Button from "../Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import DepositModal from "../Modal/DepositModal/DepositModal";

const SlotGame = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Head>
        <title>Coinbet Play - Slot Game</title>
        <meta name="description" content="Slot Game description" />
      </Head>
      <div className={styles["slot-game-wrapper"]}>
        <div className="container">
          <Button
            variant="secondary"
            size="medium"
            onClick={() => setShowModal(true)}
          >
            Open modal
          </Button>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <DepositModal onClose={() => setShowModal(false)} />
        </Modal>
      </div>
    </>
  );
};

export default SlotGame;
