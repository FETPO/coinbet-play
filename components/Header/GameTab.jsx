import Image from "next/image";
import classes from "./GameTab.module.scss";

const GameTab = ({ title, icon }) => {
  return (
    <div className={classes["game-tab"]}>
      <Image src={icon} />
      <div className={classes["tab-title"]}>{title}</div>
    </div>
  );
};

export default GameTab;
