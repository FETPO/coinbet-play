import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { formatBigNumber, formatUsdPrice } from "../../../utils/utils";
import { PolygonScanType } from "../../../types/polygonscan";
import { useWalletContext } from "../../../context/wallet.context";

interface IAmountOnWalletProps {
  selectedOption: IOption;
  polygonScanData: PolygonScanType | undefined;
}

const ConnectWallet = ({
  selectedOption,
  polygonScanData,
}: IAmountOnWalletProps) => {
  const ref = useRef(null);
  const [showAccountDetailsPopover, setShowAccountDetailsPopover] =
    useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [showAccountDetailsPopup, setShowAccountDetailsPopup] = useState(false);

  useOnClickOutside(ref, () => {
    if (window.screen.width > 576) {
      setShowAccountDetailsPopover(false);
    } else {
      setShowAccountDetailsPopup(false);
    }
  });

  const { disconnectWallet, wallet, selectedWallet, toggleWalletModal } = useWalletContext();

  const handleAccountDetailsPopoverClick = () => {
    if (window.screen.width > 576) {
      setShowAccountDetailsPopover(!showAccountDetailsPopover);
    } else {
      setShowAccountDetailsPopup(true);
    }
  };


  return (
    <div className={styles["connect-wallet"]} ref={ref}>
      {wallet ? (
        <div
          className={styles["account-address"]}
          onClick={handleAccountDetailsPopoverClick}
        >
          <div className={styles["avatar"]}></div>
          <span>{formatAddress(wallet?.address)}</span>
        </div>
      ) : (
        <Button
          variant="secondary"
          size="medium"
          onClick={() => toggleWalletModal(true)}
        >
          Connect Wallet
        </Button>
      )}
      {showAccountDetailsPopover && (
        <div className={styles["account-details-popover"]}>
          <div className={styles["wallet-address-section"]}>
            <div className={styles["wallet-icon"]}>{selectedWallet?.icon}</div>
            <div className={styles["wallet-type-address"]}>
              <p>{selectedOption.name}</p>
              <CopyToClipboard
                text={wallet?.address || ''}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 2000);
                }}
              >
                <span title="Click to copy to clipboard">
                  {formatAddress(wallet?.address)}
                  {addressCopied ? <Tooltip text="Copied!" /> : null}
                </span>
              </CopyToClipboard>
            </div>
          </div>
          <div className={styles["available-amount-section"]}>
            <div>
              {selectedOption.icon}
              <span>{formatBigNumber(wallet?.balance)}</span>
            </div>
            <div>$ {formatUsdPrice(polygonScanData?.maticPriceUsd, wallet?.balance)}</div>
          </div>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => {
              disconnectWallet();
              setShowAccountDetailsPopover(false);
            }}
            icon={<LogoutIcon />}
          >
            Disconnect
          </Button>
        </div>
      )}
      <Modal
        open={showAccountDetailsPopup}
        onClose={() => setShowAccountDetailsPopup(false)}
      >
        <AccountDetailsModal
          onClose={() => setShowAccountDetailsPopup(false)}
          selectedWallet={selectedWallet}
          selectedOption={selectedOption}
          walletAddress={wallet?.address || ''}
          addressCopied={addressCopied}
          setAddressCopied={setAddressCopied}
          onDisconnectWallet={disconnectWallet}
        />
      </Modal>
    </div>
  );
};

export default ConnectWallet;
