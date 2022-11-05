import { ethers } from "ethers";

export type SubgraphType = {
  settledBets: any[] | undefined;
  betStatistics: any | undefined;
};

export type SubgraphContextType = {
  subgraph: SubgraphType | undefined;
  updateBetsData: (betResult: any) => void
};
