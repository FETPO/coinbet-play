import Image from "next/image";
import React from "react";
import { useSubgraphContext } from "../../../../context/subgraph.context";
import { useWalletContext } from "../../../../context/wallet.context";
import { formatAddress } from "../../../../utils/format";
import { MaticIcon } from "../../../svgs/MaticIcon";
import styles from "./MyRolls.module.scss";

interface IMyRollsProps {
  collapseDown: boolean;
}

const MyRolls = ({ collapseDown }: IMyRollsProps) => {
  const { subgraph } = useSubgraphContext();
  const { wallet } = useWalletContext();

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
        {wallet && subgraph?.settledBets
          ?.filter((val) => {
            return val.fullAddress?.toLowerCase() === wallet?.address?.toLowerCase();
          })
          .map((roll, index) => {
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
                  {roll.results.map((r: any) => {
                    return <Image src={r.imageURL} alt="NFT" key={r.id} />;
                  })}
                </div>
                <div className={styles["td"]}>{roll.date}</div>
                <div className={styles["td"]}>
                  <MaticIcon />
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
