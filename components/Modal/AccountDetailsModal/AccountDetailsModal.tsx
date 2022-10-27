import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { IOption } from "../../../types/dropdown";
import { formatAddress } from "../../../utils/format";
import Button from "../../Button/Button";
import { LogoutIcon } from "../../svgs/LogoutIcon";
import Tooltip from "../../Tooltip/Tooltip";
import styles from "./AccountDetailsModal.module.scss";

interface IAccountDetailsModalProps {
  onClose: () => void;
  selectedOption: IOption;
  selectedWallet: IOption | null;
  walletAddress: string;
  addressCopied: boolean;
  setAddressCopied: (val: boolean) => void;
  setIsLoggedIn: (val: boolean) => void;
  onDisconnectWallet: () => void;
}

const AccountDetailsModal = ({
  onClose,
  selectedWallet,
  selectedOption,
  walletAddress,
  addressCopied,
  setAddressCopied,
  setIsLoggedIn,
  onDisconnectWallet,
}: IAccountDetailsModalProps) => {
  return (
    <div className={styles["account-details-popover"]}>
      <div className={styles["wallet-address-section"]}>
        <div className={styles["wallet-icon"]}>{selectedWallet?.icon}</div>
        <div className={styles["wallet-type-address"]}>
          <p>{selectedOption.name}</p>
          <CopyToClipboard
            text={walletAddress}
            onCopy={() => {
              setAddressCopied(true);
              setTimeout(() => {
                setAddressCopied(false);
              }, 2000);
            }}
          >
            <span title="Click to copy to clipboard">
              {formatAddress(walletAddress)}
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
          onDisconnectWallet();
          setIsLoggedIn(false);
          onClose();
        }}
        icon={<LogoutIcon />}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default AccountDetailsModal;
