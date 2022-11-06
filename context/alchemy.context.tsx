import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { FC, ReactNode } from "react";
import CoinbetSlotGameContract from "../contracts/CoinbetSlotGame.json";
import CoinbetHousePoolContract from "../contracts/CoinbetHousePool.json";
import {
  AlchemyContextType,
  AlchemyType,
  CoinbetGameType,
  CoinbetHousePoolType,
} from "../types/alchemy";
import { BigNumber, Contract, ethers } from "ethers";
import { useWalletContext } from "./wallet.context";
import { Alchemy, Network } from "alchemy-sdk";

const AlchemyContext = createContext<AlchemyContextType>({
  alchemy: undefined,
});

export const AlchemyContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alchemy, setAlchemy] = useState<AlchemyType>();

  const {wallet} = useWalletContext();

  useEffect(() => {
    const initCoinbetGameData = async () => {
      // Init Alchemy Provider
      const alchemyProvider = new ethers.providers.AlchemyProvider(
        "maticmum",
        `${process.env.ALCHEMY_API_KEY}`
      );
      // Init contract to fetch data
      const coinbetSlotGame = new Contract(
        process.env.COINBET_SLOT_GAME_CONTRACT as any,
        CoinbetSlotGameContract?.abi,
        alchemyProvider
      );
      // Fetch Data
      const minBetAmount = await coinbetSlotGame.minBetAmount();
    //   const maxBetAmount = await coinbetSlotGame.maxBetAmount();
    //   const protocolFeeBps = await coinbetSlotGame.protocolFeeBps();
    //   const coinbetTokenFeeWaiverThreshold =
    //     await coinbetSlotGame.coinbetTokenFeeWaiverThreshold();
      // Init contract to fetch data
      const coinbetHousePool = new Contract(
        process.env.COINBET_HOUSE_POOL_CONTRACT as any,
        CoinbetHousePoolContract?.abi,
        alchemyProvider
      );
      // Fetch Data
      const availableFundsForPayroll =
        await coinbetHousePool.availableFundsForPayroll();
    //   const _coinbetTokenFeeWaiverThreshold =
    //     await coinbetHousePool.coinbetTokenFeeWaiverThreshold();
    //   const coinbetTokenRewardMultiplier =
    //     await coinbetHousePool.coinbetTokenRewardMultiplier();
      const epochEndAt = await coinbetHousePool.epochEndAt();
      const epochStartedAt = await coinbetHousePool.epochStartedAt();
    //   const epochSeconds = await coinbetHousePool.epochSeconds();
    //   const exitFeeBps = await coinbetHousePool.exitFeeBps();
    //   const finalizeEpochBonus = await coinbetHousePool.finalizeEpochBonus();
      const hasEpochEnded = await coinbetHousePool.hasEpochEnded();
    //   const incentiveMode = await coinbetHousePool.incentiveMode();
    //   const maxBetToPoolRatio = await coinbetHousePool.maxBetToPoolRatio();
    //   const pendingBetsAmount = await coinbetHousePool.pendingBetsAmount();
      const poolBalance = await coinbetHousePool.poolBalance();
    //   const poolMaxCap = await coinbetHousePool.poolMaxCap();
    //   const protocolRewardsBalance =
    //     await coinbetHousePool.protocolRewardsBalance();
    //   const housePoolTokenTotalSupply =
    //     await coinbetHousePool.housePoolTokenTotalSupply();
    //   const housePoolTokenUserBalance =
    //     await coinbetHousePool.housePoolTokenUserBalance();
    //   const withdrawTimeWindowSeconds =
    //     await coinbetHousePool.withdrawTimeWindowSeconds();

      // Set data in state
      setAlchemy({
        coinbetGameData: {
        //   coinbetTokenFeeWaiverThreshold: coinbetTokenFeeWaiverThreshold,
          minBetAmount: minBetAmount,
        //   maxBetAmount: maxBetAmount,
        //   protocolFeeBps: protocolFeeBps,
        } as CoinbetGameType,
        coinbetHousePoolData: {
          availableFundsForPayroll: availableFundsForPayroll,
        //   coinbetTokenFeeWaiverThreshold: _coinbetTokenFeeWaiverThreshold,
        //   coinbetTokenRewardMultiplier: coinbetTokenRewardMultiplier,
          epochEndAt: epochEndAt,
          epochStartedAt: epochStartedAt,
        //   epochSeconds: epochSeconds,
        //   exitFeeBps: exitFeeBps,
        //   finalizeEpochBonus: finalizeEpochBonus,
          hasEpochEnded: hasEpochEnded,
        //   incentiveMode: incentiveMode,
        //   maxBetToPoolRatio: maxBetToPoolRatio,
        //   pendingBetsAmount: pendingBetsAmount,
          poolBalance: poolBalance,
        //   poolMaxCap: poolMaxCap,
        //   protocolRewardsBalance: protocolRewardsBalance,
        //   housePoolTokenTotalSupply: BigNumber.from(0),
        //   housePoolTokenUserBalance: BigNumber.from(0),
        //   withdrawTimeWindowSeconds: withdrawTimeWindowSeconds,
        } as CoinbetHousePoolType,
      });
    };
    initCoinbetGameData();
  }, [wallet?.balance]);

  return (
    <AlchemyContext.Provider
      value={{
        alchemy,
      }}
    >
      {children}
    </AlchemyContext.Provider>
  );
};

// custom hook
export function useAlchemyContext() {
  return useContext(AlchemyContext);
}
