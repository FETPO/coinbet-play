import styles from "./Header.module.scss";
import { useRouter } from "next/router";
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
import { MiniMetamaskIcon } from "../svgs/MiniMetamaskIcon";
import { MiniCoinbaseIcon } from "../svgs/MiniCoinbaseIcon";
import { MiniWalletConnectIcon } from "../svgs/MiniWalletConnectIcon";
import { MiniLogoIcon } from "../svgs/MiniLogoIcon";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { useWalletContext } from "../../context/wallet.context";
import { usePolygonScanContext } from "../../context/polygonscan.context";

const Header = () => {
  const router = useRouter();
  const dropdownOptions = [
    {
      id: useId(),
      name: "Polygon",
      icon: <MaticIcon />,
    },
    {
      id: useId(),
      name: "Ethereum",
      icon: <EthIcon />,
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

  const availableWallets = [
    {
      id: useId(),
      name: "MetaMask",
      icon: <MiniMetamaskIcon />,
    },
    {
      id: useId(),
      name: "Coinbase Wallet",
      icon: <MiniCoinbaseIcon />,
    },
    {
      id: useId(),
      name: "WalletConnect",
      icon: <MiniWalletConnectIcon />,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<IOption>(
    dropdownOptions[0]
  );
  const [selectedWallet, setSelectedWallet] = useState<IOption | null>(availableWallets[0]);
  const { wallet } = useWalletContext();
  const { polygonScanData } = usePolygonScanContext();

  return (
    <div className={styles["header-wrapper"]}>
      <div className="container">
        <div className={styles["left"]}>
          <div className={styles["app-logo"]} onClick={() => router.push("/")}>
            <div className={styles["desktop-logo"]}>
              <LogoIcon />
            </div>
            <div className={styles["mobile-logo"]}>
              <MiniLogoIcon />
            </div>
          </div>
          <Navbar />
        </div>
        <div className={styles["right"]}>
          <Dropdown
            options={dropdownOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <AmountOnWallet
            selectedOption={selectedOption}
            balance={wallet?.balance}
            polygonScanData={polygonScanData}
          />
          <ConnectWallet
            selectedOption={selectedOption}
            availableWallets={availableWallets}
            selectedWallet={selectedWallet}
            setSelectedWallet={setSelectedWallet}
            walletInfo={wallet}
            polygonScanData={polygonScanData}
          />
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
