import { Box, Container, Text } from "@chakra-ui/react";
import WalletConnectionButton from "../buttons/wallet-connection-button";
import Link from "next/link";
import WalletDisplayButton from "../buttons/wallet-display-button";
import logo from "../../assets/images/coinbetfi-logo.svg";
import Image from "next/image";
import classes from "./Header.module.scss";
import GameTab from "./GameTab";
import slotsIcon from "../../assets/icons/slots-icon.svg";
import rewardPoolIcon from "../../assets/icons/reward-pool-icon.svg";
import howToUseIcon from "../../assets/icons/how-to-use-icon.svg";
import userIcon from "../../assets/icons/user-profile-icon.svg";
import ethIcon from "../../assets/icons/eth-icon.svg";
import arrow from "../../assets/icons/dropdown-arrow-icon.svg";
import { formatAddress } from "../../utils/format";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className={classes["header-wrapper"]}>
      <div className={classes["header-container"]}>
        <div
          className={classes["logo-container"]}
          onClick={() => router.push("/")}
        >
          <Image src={logo} width={117} height={17} />
        </div>
        <div className={classes["tabs"]}>
          <div className={classes["game-tabs"]}>
            <GameTab
              title={"Slot Game"}
              icon={slotsIcon}
              onClick={() => router.push("/slot-game")}
            />
            <GameTab
              title={"Reward Pool"}
              icon={rewardPoolIcon}
              onClick={() => router.push("/reward-pool")}
            />
            <GameTab
              title={"How to use"}
              icon={howToUseIcon}
              onClick={() => router.push("/how-to-use")}
            />
          </div>
          <div className={classes["user-tabs"]}>
            <div className={classes["active-network"]}>
              <Image src={ethIcon} /> <div>Ethereum</div> <Image src={arrow} />
            </div>
            <div className={classes["user-balance"]}>
              <Image src={ethIcon} />
              <div className={classes["balance"]}>
                <div className={classes["eth"]}>2.233</div>
                <div className={classes["dollars"]}>$3513.35</div>
              </div>
            </div>
            <div className={classes["user-profile"]}>
              <Image src={userIcon} width={20} height={20} />
              {formatAddress("0x514DAdD7763d0d05A07Ca7817915cB8C6cA8248b")}
            </div>
          </div>
        </div>
      </div>
      {/* <WalletConnectionButton />
          <WalletDisplayButton /> */}
    </div>
  );
};

export default Header;
