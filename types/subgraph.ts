import { ethers } from "ethers";

export type SubgraphType = {
  settledBets: any[];
  betStatistics: any;
};

export type SubgraphContextType = {
  subgraph: SubgraphType | undefined;
};
