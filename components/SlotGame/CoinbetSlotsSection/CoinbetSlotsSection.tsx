import Image from "next/image";
import React from "react";
import Button from "../../Button/Button";
import { EthIcon } from "../../svgs/EthIcon";
import { InfoIcon } from "../../svgs/InfoIcon";
import { TerminalIcon } from "../../svgs/TerminalIcon";
import { ValueOffIcon } from "../../svgs/ValueOffIcon";
import Tooltip from "../../Tooltip/Tooltip";
import styles from "./CoinbetSlotsSection.module.scss";
import coinImage from "../../../assets/images/coin.png";

const CoinbetSlotsSection = () => {
  return (
    <div className={styles["coinbet-slots-section"]}>
      <div className={styles["coinbet-slots-header"]}>
        <div className={styles["coinbet-slots-header-left"]}>
          <h3>Coinbet Slots</h3>
          <div className={styles["coinbet-slots-header-left-icons"]}>
            <div className={styles["icon"]}>
              <InfoIcon />
              <Tooltip text="View Contract" />
            </div>
            <div className={styles["icon"]}>
              <TerminalIcon />
              <Tooltip text="View Contract" />
            </div>
            <div className={styles["icon"]}>
              <ValueOffIcon />
              <Tooltip text="View Contract" />
            </div>
          </div>
        </div>
        <div className={styles["coinbet-slots-header-right"]}>
          <div>
            <span>Win chance:</span>
            <span>50%</span>
          </div>
          <div>
            <span>House edge:</span>
            <span>3%</span>
          </div>
        </div>
      </div>
      <div className={styles["coinbet-slots-body"]}>
        <div className={styles["current-slots"]}>
          <div className={styles["slot"]}>
            <Image src={coinImage} alt="coin" />
          </div>
          <div className={styles["slot"]}>
            <Image src={coinImage} alt="coin" />
          </div>
          <div className={styles["slot"]}>
            <Image src={coinImage} alt="coin" />
          </div>
          <div className={styles["spin-btn"]}>
            <Button variant="primary" size="medium">
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
            <EthIcon />
            10,000
          </p>
        </div>
        <div>
          <h3>Rewards</h3>
          <p>
            <EthIcon />
            12,000
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinbetSlotsSection;
