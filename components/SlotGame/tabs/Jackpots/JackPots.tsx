import Image from "next/image";
import React from "react";
import { JackpotsDummyData } from "../../../../utils/dummyData/jackpots";
import { formatAddress } from "../../../../utils/format";
import { EthIcon } from "../../../svgs/EthIcon";
import styles from "./JackPots.module.scss";

interface IJackpotsProps {
  collapseDown: boolean;
}

const JackPots = ({ collapseDown }: IJackpotsProps) => {
  let rollsData = JackpotsDummyData();

  return (
    <div className={styles["jackpots-table"]}>
      <div className={styles["jackpots-table-header"]}>
        <div className={styles["tr"]}>
          <div className={styles["th"]}>Player</div>
          <div className={styles["th"]}>Results</div>
          <div className={styles["th"]}>Date</div>
          <div className={styles["th"]}>Payout</div>
        </div>
      </div>
      <div
        className={`${styles["jackpots-table-body"]} ${
          collapseDown ? styles["collapseDown"] : ""
        }`}
      >
        {rollsData.map((roll, index) => {
          return (
            <div
              className={`${styles["tr"]} ${
                index % 2 === 0 ? "" : styles["odd"]
              }`}
              key={roll.id}
            >
              <div className={styles["td"]}>
                {formatAddress(roll.playerAddress)}
              </div>
              <div className={styles["td"]}>
                {roll.results.map((r) => {
                  return <Image src={r.imageURL} alt="NFT" key={r.id} />;
                })}
              </div>
              <div className={styles["td"]}>{roll.date}</div>
              <div className={styles["td"]}>
                <EthIcon />
                <h3>{roll.payout}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JackPots;
