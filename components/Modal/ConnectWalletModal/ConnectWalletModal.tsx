import React from "react";
import { IOption } from "../../../types/dropdown";
import styles from "./ConnectWalletModal.module.scss";

interface IConnectWalletModalProps {
  onClose: () => void;
  availableWallets: IOption[];
  setSelectedWallet: (wallet: IOption) => void;
  setIsLoggedIn: (val: boolean) => void;
}

const ConnectWalletModal = ({
  onClose,
  availableWallets,
  setSelectedWallet,
  setIsLoggedIn,
}: IConnectWalletModalProps) => {
  return (
    <div className={styles["connect-wallet-popup-content"]}>
      <h1>Connect Wallet</h1>
      <div className={styles["wallets"]}>
        {availableWallets.map((wallet) => {
          return (
            <div
              key={wallet.id}
              onClick={() => {
                setSelectedWallet(wallet);
                setIsLoggedIn(true);
                onClose();
              }}
            >
              {wallet.icon}
              <span>{wallet.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectWalletModal;
