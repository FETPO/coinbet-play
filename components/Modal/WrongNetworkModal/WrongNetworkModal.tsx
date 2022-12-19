import React from "react";
import Button from "../../Button/Button";
import styles from "./WrongNetworkModal.module.scss";
import { RedFailIcon } from "../../svgs/RedFailIcon";
import { decimalToHex } from "../../../utils/utils";
import { useWalletContext } from "../../../context/wallet.context";

interface IWrongNetworkModalProps {
    onClose: () => void;
}

const WrongNetworkModal = ({ onClose }: IWrongNetworkModalProps) => {
    const { switchChain } = useWalletContext();
    return (
        <div className={styles["wrong-network-popup-content"]}>
            <div className={styles["failed-icon"]}>
                <RedFailIcon />
            </div>
            <h1>Wrong Network</h1>
            <p>
                Please switch your wallet network to Polygon Mainnet to use the app.
            </p>
            <Button variant="outlined" size="medium" onClick={switchChain}>
                Switch Network
            </Button>
        </div>
    );
};

export default WrongNetworkModal;
