import React, { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { MaticIcon } from "../../svgs/MaticIcon";
import { InfoIcon } from "../../svgs/InfoIcon";
import { TerminalIcon } from "../../svgs/TerminalIcon";
import { VolumeOffIcon } from "../../svgs/VolumeOffIcon";
import { VolumeOnIcon } from "../../svgs/VolumeOnIcon";
import Tooltip from "../../Tooltip/Tooltip";
import styles from "./CoinbetSlotsSection.module.scss";
import coinImage from "../../../assets/images/coin.png";
import BAYC_IMG from "../../../assets/images/BAYC_8817.png";
import CBD_IMG from "../../../assets/images/CBD_139.png";
import Doodles_IMG from "../../../assets/images/Doodles_6914.png";
import MAYC_IMG from "../../../assets/images/MAYC_4849.png";
import Moonbirds_IMG from "../../../assets/images/Moonbirds_2018.png";
import PUNK_IMG from "../../../assets/images/PUNK_5822.png";
import CongratulationModal from "../../Modal/CongratulationModal/CongratulationModal";
import Modal from "../../Modal/Modal";
import { useContractsContext } from "../../../context/contract.context";

const CoinbetSlotsSection = () => {
  const [showCongratulationModal, setShowCongratulationModal] = useState(false);
  const [volumeOn, setVolumeOn] = useState(false);
  const items = [
    BAYC_IMG,
    CBD_IMG,
    Doodles_IMG,
    MAYC_IMG,
    Moonbirds_IMG,
    PUNK_IMG,
    BAYC_IMG,
    CBD_IMG,
    Doodles_IMG,
    MAYC_IMG,
    Moonbirds_IMG,
    PUNK_IMG,
    BAYC_IMG,
    CBD_IMG,
    Doodles_IMG,
    MAYC_IMG,
    Moonbirds_IMG,
    PUNK_IMG
  ];

  const { contracts } = useContractsContext();

  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  const init = (firstInit = true, groups = 1, duration = 1) => {
    let slots: any = document.querySelectorAll(".slot");

    for (const slot of slots) {
      if (firstInit) {
        slot.dataset.spinned = "0";
      }

      const boxes = slot.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = [];

      // if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...items);
      }
      pool.push(...shuffle(arr));

      boxesClone.addEventListener(
        "transitionstart",
        function () {
          slot.dataset.spinned = "1";
          // boxesClone.querySelectorAll(".box").forEach((box: HTMLElement) => {
          //   box.style.filter = "blur(1px)";
          // });
        }
        // { once: true }
      );

      boxesClone.addEventListener("transitionend", function () {
        setTimeout(() => setShowCongratulationModal(true), 1000);
      });
      // }

      for (let i = pool.length - 1; i >= 0; i--) {
        const img: HTMLImageElement = document.createElement("img");
        img.src = pool[i].src;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.borderRadius = "12px";
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = slot.clientWidth + "px";
        box.style.height = slot.clientHeight + "px";
        box.style.display = "flex";
        box.style.justifyContent = "center";
        box.style.alignItems = "center";
        box.appendChild(img);
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      if (firstInit) {
        boxesClone.style.transform = `translateY(${slot.clientHeight / 2}px)`;
      } else {
        boxesClone.style.transform = `translateY(-${
          slot.clientHeight * (pool.length - 8)
        }px)`;
      }
      slot.replaceChild(boxesClone, boxes);
    }
  };

  const handleSpin = async () => {
    init(false, 1, 2);

    let slots: any = document.querySelectorAll(".slot");
    if (slots && slots.length) {
      for (const slot of slots) {
        const boxes: HTMLElement = slot.querySelector(".boxes");
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = `translateY(${slot.clientHeight / 2}px)`;
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleSpinTxn = async () => {
    const coinbetTxn = await contracts?.coinbetSlotGame.coinbet(
      { value: "1000000000000000" }
    );
    setTimeout(handleSpin, 1000);
    const coinbetTxnReceipt = await coinbetTxn.wait();
  }

  return (
    <div className={styles["coinbet-slots-section"]}>
      <div className={styles["coinbet-slots-header"]}>
        <div className={styles["coinbet-slots-header-left"]}>
          <h3>NFT Degen Slots</h3>
          <div className={styles["coinbet-slots-header-left-icons"]}>
            <div className={styles["icon"]}>
              <InfoIcon />
              <Tooltip text="Pellentesque nunc nec et vel pellentesque interdum arcu" />
            </div>
            <div className={styles["icon"]}>
              <TerminalIcon />
              <Tooltip text="View Contract" />
            </div>
            <div className={styles["icon"]}>
              {!volumeOn ? (
                <div
                  onClick={() => setVolumeOn(true)}
                  className={styles["volume-icon"]}
                >
                  <VolumeOffIcon />
                </div>
              ) : (
                <div
                  onClick={() => setVolumeOn(false)}
                  className={styles["volume-icon"]}
                >
                  <VolumeOnIcon />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles["coinbet-slots-header-right"]}>
          <div>
            <span>Win chance:</span>
            <span>44.44%</span>
          </div>
          <div>
            <span>House edge:</span>
            <span>2.8%</span>
          </div>
        </div>
      </div>
      <div className={styles["coinbet-slots-body"]}>
        <div className={styles["current-slots"]}>
          <div className={`slot ${styles["slot"]}`}>
            <div className={`boxes ${styles["boxes"]}`}>
              {/* <Image src={coinImage} alt="coin" /> */}
            </div>
          </div>
          <div className={`slot ${styles["slot"]}`}>
            <div className={`boxes ${styles["boxes"]}`}>
              {/* <Image src={coinImage} alt="coin" /> */}
            </div>
          </div>
          <div className={`slot ${styles["slot"]}`}>
            <div className={`boxes ${styles["boxes"]}`}>
              {/* <Image src={coinImage} alt="coin" /> */}
            </div>
          </div>
          <div className={styles["spin-btn"]}>
            <Button variant="primary" size="medium" onClick={handleSpinTxn}>
              Spin
            </Button>
          </div>
        </div>
      </div>
      <div className={styles["coinbet-slots-footer"]}>
        <div>
          <h3>Spins</h3>
          <p>1,000</p>
        </div>
        <div>
          <h3>Players</h3>
          <p>5,000</p>
        </div>
        <div>
          <h3>Volume</h3>
          <p>
            <MaticIcon />
            10,000
          </p>
        </div>
        <div>
          <h3>Rewards</h3>
          <p>
            <MaticIcon />
            12,000
          </p>
        </div>
      </div>
      <Modal
        open={showCongratulationModal}
        onClose={() => setShowCongratulationModal(false)}
      >
        <CongratulationModal
          onClose={() => setShowCongratulationModal(false)}
        />
      </Modal>
    </div>
  );
};

export default CoinbetSlotsSection;
