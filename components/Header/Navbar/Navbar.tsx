import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HowToUseIcon } from "../../svgs/HowToUseIcon";
import { RewardPoolIcon } from "../../svgs/RewardPoolIcon";
import { SlotGameIcon } from "../../svgs/SlotGameIcon";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const router = useRouter();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setSelectedMenuIndex(0);
        break;
      case "/reward-pool":
        setSelectedMenuIndex(1);
        break;
      case "/how-to-use":
        setSelectedMenuIndex(2);
        break;
      default:
        setSelectedMenuIndex(0);
        break;
    }
  }, [router]);

  return (
    <div className={styles["app-menu"]}>
      <div
        className={selectedMenuIndex === 0 ? styles["active"] : ""}
        onClick={() => {
          router.push("/");
        }}
      >
        <SlotGameIcon />
        <span>Slot Game</span>
      </div>
      <div
        className={selectedMenuIndex === 1 ? styles["active"] : ""}
        onClick={() => {
          router.push("/reward-pool");
        }}
      >
        <RewardPoolIcon />
        <span>House Pool</span>
      </div>
      <div
        className={selectedMenuIndex === 2 ? styles["active"] : ""}
        onClick={() => {
          router.push("/how-to-use");
        }}
      >
        <HowToUseIcon />
        <span>How to use</span>
      </div>
    </div>
  );
};

export default Navbar;
