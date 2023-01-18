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
      case "/pools":
        setSelectedMenuIndex(1);
        break;
      case "/faq":
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
        <span>Games</span>
      </div>
      <div
        className={selectedMenuIndex === 1 ? styles["active"] : ""}
        onClick={() => {
          router.push("/pools");
        }}
      >
        <RewardPoolIcon />
        <span>House Pools</span>
      </div>
      <div
        className={selectedMenuIndex === 2 ? styles["active"] : ""}
        onClick={() => {
          router.push("/faq");
        }}
      >
        <HowToUseIcon />
        <span>FAQ</span>
      </div>
    </div>
  );
};

export default Navbar;
