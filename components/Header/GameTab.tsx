import Image from "next/image";
import classes from "./GameTab.module.scss";

type GameTabPropsType = {
  title: String;
  icon: any;
  onClick: any;
};

const GameTab = ({ title, icon, onClick }: GameTabPropsType) => {
  return (
    <div className={classes["game-tab"]} onClick={onClick}>
      <Image src={icon} />
      <div className={classes["tab-title"]}>{title}</div>
    </div>
  );
};

export default GameTab;
