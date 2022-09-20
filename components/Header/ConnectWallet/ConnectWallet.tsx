import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { formatAddress } from "../../../utils/format";
import { EthIcon } from "../../svgs/EthIcon";
import { MiniMetamaskIcon } from "../../svgs/MiniMetamaskIcon";
import styles from "./ConnectWallet.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IOption } from "../../../types/dropdown";

const WALLET_ADDRESS: string = "0x6d592909746d2d80C5384E0ECB673B24053057A1";

interface IAmountOnWalletProps {
  selectedOption: IOption;
}

const ConnectWallet = ({ selectedOption }: IAmountOnWalletProps) => {
  const ref = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountDetailsPopover, setShowAccountDetailsPopover] =
    useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  useOnClickOutside(ref, () => setShowAccountDetailsPopover(false));

  return (
    <div className={styles["connect-wallet"]} ref={ref}>
      {isLoggedIn ? (
        <div
          className={styles["account-address"]}
          onClick={() =>
            setShowAccountDetailsPopover(!showAccountDetailsPopover)
          }
        >
          <div className={styles["avatar"]}></div>
          <span>{formatAddress(WALLET_ADDRESS)}</span>
        </div>
      ) : (
        <div
          className={styles["connect-btn"]}
          onClick={() => setIsLoggedIn(true)}
        >
          Connect wallet
        </div>
      )}
      {showAccountDetailsPopover && (
        <div className={styles["account-details-popover"]}>
          <div className={styles["wallet-address-section"]}>
            <div className={styles["wallet-icon"]}>
              <MiniMetamaskIcon />
            </div>
            <div className={styles["wallet-type-address"]}>
              <p>Ethereum</p>
              <CopyToClipboard
                text={WALLET_ADDRESS}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 2000);
                }}
              >
                <span title="Click to copy to clipboard">
                  {formatAddress(WALLET_ADDRESS)}
                  {addressCopied ? (
                    <span className={styles["copied-text"]}>Copied!</span>
                  ) : null}
                </span>
              </CopyToClipboard>
            </div>
          </div>
          <div className={styles["available-amount-section"]}>
            <div>
              {selectedOption.icon}
              <span>2.234</span>
            </div>
            <div>$ 3825.68</div>
          </div>
          <div
            className={styles["disconnect-btn-section"]}
            onClick={() => {
              setIsLoggedIn(false);
              setShowAccountDetailsPopover(false);
            }}
          >
            Disconnect
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
