import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import ThemeChanger from "./ThemeChanger/ThemeChanger";
import { LogoIcon } from "../svgs/LogoIcon";
import Navbar from "./Navbar/Navbar";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import AmountOnWallet from "./AmountOnWallet/AmountOnWallet";
import Dropdown from "../Dropdown/Dropdown";
import { useId, useState } from "react";
import { EthIcon } from "../svgs/EthIcon";
import { MaticIcon } from "../svgs/MaticIcon";
import { BSCIcon } from "../svgs/BSCIcon";
import { AvalancheIcon } from "../svgs/AvalancheIcon";
import { IOption } from "../../types/dropdown";

const Header = () => {
  const router = useRouter();
  const dropdownOptions = [
    {
      id: useId(),
      name: "Ethereum",
      icon: <EthIcon />,
    },
    {
      id: useId(),
      name: "Polygon",
      icon: <MaticIcon />,
    },
    {
      id: useId(),
      name: "BSC Mainnet",
      icon: <BSCIcon />,
    },
    {
      id: useId(),
      name: "Avalance",
      icon: <AvalancheIcon />,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<IOption>(
    dropdownOptions[0]
  );

  return (
    <div className={styles["header-wrapper"]}>
      <div className="container">
        <div className={styles["left"]}>
          <div className={styles["app-logo"]} onClick={() => router.push("/")}>
            <LogoIcon />
          </div>
          <Navbar />
        </div>
        <div className={styles["right"]}>
          <Dropdown
            options={dropdownOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <AmountOnWallet selectedOption={selectedOption} />
          <ConnectWallet selectedOption={selectedOption} />
          <ThemeChanger />
        </div>
      </div>
    </div>
  );
};

export default Header;
