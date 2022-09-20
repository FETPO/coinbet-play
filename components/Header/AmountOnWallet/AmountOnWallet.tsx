import React from "react";
import { IOption } from "../../../types/dropdown";
import styles from "./AmountOnWallet.module.scss";

interface IAmountOnWalletProps {
  selectedOption: IOption;
}

const AmountOnWallet = ({ selectedOption }: IAmountOnWalletProps) => {
  return (
    <div className={styles["amount-on-wallet"]}>
      <div>{selectedOption.icon}</div>
      <div>
        <span>2.234</span>
        <p>$ 3825.68</p>
      </div>
    </div>
  );
};

export default AmountOnWallet;
