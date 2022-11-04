import { ethers } from "ethers";

export type CoinbetGameType = {
  coinbetTokenFeeWaiverThreshold: ethers.BigNumber;
  minBetAmount: ethers.BigNumber;
  maxBetAmount: ethers.BigNumber;
  protocolFeeBps: ethers.BigNumber;
};
export type CoinbetHousePoolType = {
  availableFundsForPayroll: ethers.BigNumber;
  coinbetTokenFeeWaiverThreshold: ethers.BigNumber;
  coinbetTokenRewardMultiplier: ethers.BigNumber;
  epochEndAt: ethers.BigNumber;
  epochStartedAt: ethers.BigNumber;
  epochSeconds: ethers.BigNumber;
  exitFeeBps: ethers.BigNumber;
  finalizeEpochBonus: ethers.BigNumber;
  hasEpochEnded: boolean;
  incentiveMode: boolean;
  maxBetToPoolRatio: ethers.BigNumber;
  pendingBetsAmount: ethers.BigNumber;
  poolBalance: ethers.BigNumber;
  poolMaxCap: ethers.BigNumber;
  protocolRewardsBalance: ethers.BigNumber;
  housePoolTokenTotalSupply: ethers.BigNumber;
  housePoolTokenUserBalance: ethers.BigNumber;
  withdrawTimeWindowSeconds: ethers.BigNumber;
};

export type AlchemyType = {
  coinbetGameData: CoinbetGameType | undefined;
  coinbetHousePoolData: CoinbetHousePoolType | undefined;
};

export type AlchemyContextType = {
  alchemy: AlchemyType | undefined;
};
