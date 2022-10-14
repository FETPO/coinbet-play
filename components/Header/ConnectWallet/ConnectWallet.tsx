import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { formatAddress } from "../../../utils/format";
import styles from "./ConnectWallet.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IOption } from "../../../types/dropdown";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import ConnectWalletModal from "../../Modal/ConnectWalletModal/ConnectWalletModal";
import Tooltip from "../../Tooltip/Tooltip";
import { LogoutIcon } from "../../svgs/LogoutIcon";
import AccountDetailsModal from "../../Modal/AccountDetailsModal/AccountDetailsModal";

const WALLET_ADDRESS: string = "0x6d592909746d2d80C5384E0ECB673B24053057A1";

interface IAmountOnWalletProps {
  selectedOption: IOption;
  availableWallets: IOption[];
  selectedWallet: IOption | null;
  setSelectedWallet: (wallet: IOption) => void;
}

const ConnectWallet = ({
  selectedOption,
  availableWallets,
  selectedWallet,
  setSelectedWallet
}: IAmountOnWalletProps) => {
  const ref = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showAccountDetailsPopover, setShowAccountDetailsPopover] =
    useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [showAccountDetailsPopup, setShowAccountDetailsPopup] = useState(false);

  useOnClickOutside(ref, () => setShowAccountDetailsPopover(false));

  const handleAccountDetailsPopoverClick = () => {
    if (window.screen.width > 576) {
      setShowAccountDetailsPopover(!showAccountDetailsPopover);
    } else {
      setShowAccountDetailsPopup(true);
    }
  };

  return (
    <div className={styles["connect-wallet"]} ref={ref}>
      {isLoggedIn ? (
        <div
          className={styles["account-address"]}
          onClick={handleAccountDetailsPopoverClick}
        >
          <div className={styles["avatar"]}></div>
          <span>{formatAddress(WALLET_ADDRESS)}</span>
        </div>
      ) : (
        <Button
          variant="secondary"
          size="medium"
          onClick={() => setShowConnectWalletModal(true)}
        >
          Sign in
        </Button>
      )}
      {showAccountDetailsPopover && (
        <div className={styles["account-details-popover"]}>
          <div className={styles["wallet-address-section"]}>
            <div className={styles["wallet-icon"]}>{selectedWallet?.icon}</div>
            <div className={styles["wallet-type-address"]}>
              <p>{selectedOption.name}</p>
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
                  {addressCopied ? <Tooltip text="Copied!" /> : null}
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
          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              setIsLoggedIn(false);
              setShowAccountDetailsPopover(false);
            }}
            icon={<LogoutIcon />}
          >
            Disconnect
          </Button>
        </div>
      )}
      <Modal
        open={showConnectWalletModal}
        onClose={() => setShowConnectWalletModal(false)}
      >
        <ConnectWalletModal
          onClose={() => setShowConnectWalletModal(false)}
          availableWallets={availableWallets}
          setSelectedWallet={setSelectedWallet}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Modal>
      <Modal
        open={showAccountDetailsPopup}
        onClose={() => setShowAccountDetailsPopup(false)}
      >
        <AccountDetailsModal
          onClose={() => setShowAccountDetailsPopup(false)}
          selectedWallet={selectedWallet}
          selectedOption={selectedOption}
          walletAddress={WALLET_ADDRESS}
          addressCopied={addressCopied}
          setAddressCopied={setAddressCopied}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Modal>
    </div>
  );
};

export default ConnectWallet;
