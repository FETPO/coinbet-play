import { ethers } from "ethers";
import React from "react";
import { IOption } from "../../../types/dropdown";
import { PolygonScanType } from "../../../types/polygonscan";
import { formatBigNumberTwoDecimals } from "../../../utils/utils";
import { CoinbetIcon } from "../../svgs/CoinbetIcon";
import styles from "./CoinbetTokenAmountOnWallet.module.scss";

interface IAmountOnWalletProps {
  balance: ethers.BigNumber | undefined;
}

const AmountOnWallet = ({ balance}: IAmountOnWalletProps) => {
  return (
    <div className={styles["coinbet-token-amount-on-wallet"]}>
      <div><CoinbetIcon/></div>
      <div>
        <span>{formatBigNumberTwoDecimals(balance)}</span>
        <p>$ 0.00</p>
      </div>
    </div>
  );
};

export default AmountOnWallet;
