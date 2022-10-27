import { ethers } from "ethers";
import React from "react";
import { IOption } from "../../../types/dropdown";
import { PolygonScanType } from "../../../types/polygonscan";
import { formatBigNumber, formatUsdPrice } from "../../../utils/utility";
import styles from "./AmountOnWallet.module.scss";

interface IAmountOnWalletProps {
  selectedOption: IOption;
  balance: ethers.BigNumber | undefined;
  polygonScanData: PolygonScanType | undefined;
}

const AmountOnWallet = ({ selectedOption, balance, polygonScanData }: IAmountOnWalletProps) => {
  return (
    <div className={styles["amount-on-wallet"]}>
      <div>{selectedOption.icon}</div>
      <div>
        <span>{formatBigNumber(balance)}</span>
        <p>$ {formatUsdPrice(polygonScanData?.maticPriceUsd, balance)}</p>
      </div>
    </div>
  );
};

export default AmountOnWallet;
