import Image from "next/image";
import React from "react";
import { MyRollsDummyData } from "../../../../utils/dummyData/my-rolls";
import { formatAddress } from "../../../../utils/format";
import { EthIcon } from "../../../svgs/EthIcon";
import styles from "./MyRolls.module.scss";

interface IMyRollsProps {
  collapseDown: boolean;
}

const MyRolls = ({ collapseDown }: IMyRollsProps) => {
  let rollsData = MyRollsDummyData();

  return (
    <div className={styles["my-rolls-table"]}>
      <div className={styles["my-rolls-table-header"]}>
        <div className={styles["tr"]}>
          <div className={styles["th"]}>Player</div>
          <div className={styles["th"]}>Results</div>
          <div className={styles["th"]}>Date</div>
          <div className={styles["th"]}>Payout</div>
        </div>
      </div>
      <div
        className={`${styles["my-rolls-table-body"]} ${
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

export default MyRolls;
