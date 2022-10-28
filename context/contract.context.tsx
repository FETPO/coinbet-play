import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import CoinbetSlotGameContract from "../contracts/CoinbetSlotGame.json";
import CoinbetHousePoolContract from "../contracts/CoinbetHousePool.json";
import { ContractsContextType, ContractsType } from "../types/contracts";
import { Contract } from "ethers";
import { useWalletContext } from "./wallet.context";

const ContractsContext = createContext<ContractsContextType>({
  contracts: undefined,
});

export const ContractsContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contracts, setContracts] = useState<ContractsType>();
  const { wallet } = useWalletContext();

  useEffect(() => {
    const initContracts = () => {
      const coinbetSlotGameContractInstance = new Contract(
        process.env.COINBET_SLOT_GAME_CONTRACT as any,
        CoinbetSlotGameContract?.abi,
        wallet?.library.getSigner(wallet.address).connectUnchecked()
      );
      const coinbetHousePoolContractInstance = new Contract(
        process.env.COINBET_HOUSE_POOL_CONTRACT as any,
        CoinbetHousePoolContract?.abi,
        wallet?.library.getSigner(wallet.address).connectUnchecked()
      );
      setContracts({
        coinbetSlotGame: coinbetSlotGameContractInstance,
        coinbetHousePool: coinbetHousePoolContractInstance,
      });
    };
    if (wallet) {
      initContracts();
    }
  }, [wallet]);

  return (
    <ContractsContext.Provider
      value={{
        contracts,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

// custom hook
export function useContractsContext() {
  return useContext(ContractsContext);
}
