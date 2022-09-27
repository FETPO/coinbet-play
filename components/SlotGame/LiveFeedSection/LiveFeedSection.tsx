import React, { useState } from "react";
import { FeedIcon } from "../../svgs/FeedIcon";
import AllRolls from "../tabs/AllRolls/AllRolls";
import JackPots from "../tabs/Jackpots/JackPots";
import MyRolls from "../tabs/MyRolls/MyRolls";
import styles from "./LiveFeedSection.module.scss";

interface ILiveFeedSectionProps {
  collapseDown: boolean;
}

const LiveFeedSection = ({ collapseDown }: ILiveFeedSectionProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className={styles["live-feed-section"]}>
      <div className={styles["live-feed-section-header"]}>
        <div className={styles["title"]}>
          <FeedIcon />
          <h3>Live Feed</h3>
        </div>
        <div className={styles["tabs"]}>
          <h3
            className={selectedTabIndex === 0 ? styles["active"] : ""}
            onClick={() => setSelectedTabIndex(0)}
          >
            All Rolls
          </h3>
          <h3
            className={selectedTabIndex === 1 ? styles["active"] : ""}
            onClick={() => setSelectedTabIndex(1)}
          >
            Jackpots
          </h3>
          <h3
            className={selectedTabIndex === 2 ? styles["active"] : ""}
            onClick={() => setSelectedTabIndex(2)}
          >
            My Rolls
          </h3>
        </div>
      </div>
      <div className={styles["live-feed-section-body"]}>
        {selectedTabIndex === 0 ? (
          <AllRolls collapseDown={collapseDown} />
        ) : selectedTabIndex === 1 ? (
          <JackPots />
        ) : (
          <MyRolls />
        )}
      </div>
    </div>
  );
};

export default LiveFeedSection;
