import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useWalletContext } from "./wallet.context";
import { SubgraphContextType, SubgraphType } from "../types/subgraph";
import {
  betsStatisticsEntity,
  betSettledEntities,
  queryCoinbetSubgraphData,
} from "../utils/graphql/queries";
import { processSettledBetsData } from "../utils/utils";

const SubgraphContext = createContext<SubgraphContextType>({
  subgraph: undefined,
  updateBetsData: async (betResult: any) => {},
});

export const SubgraphContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [subgraph, setSubgraph] = useState<SubgraphType>();
  const { wallet } = useWalletContext();

  const updateBetsData = (betResult: any) => {
    const settledBets = subgraph?.settledBets;
    const betStats = subgraph?.betStatistics;

    // Check if bet exists already
    const exists = settledBets?.find((obj) => {
      return obj.id === betResult.id;
    });

    if (!exists) {
      settledBets?.unshift(betResult);
    }
    const newSettledBets = settledBets || undefined;
    setSubgraph({ betStatistics: betStats, settledBets: newSettledBets });
  };

  useEffect(() => {
    const initSubgraph = async () => {
      const betsStats = await queryCoinbetSubgraphData(betsStatisticsEntity());
      const settledBets = await queryCoinbetSubgraphData(betSettledEntities());
      setSubgraph({
        settledBets: processSettledBetsData(settledBets.betSettledEntities),
        betStatistics: betsStats.betsStatisticsEntity,
      });
    };

    initSubgraph();
  }, [wallet?.address]);

  return (
    <SubgraphContext.Provider
      value={{
        subgraph,
        updateBetsData
      }}
    >
      {children}
    </SubgraphContext.Provider>
  );
};

// custom hook
export function useSubgraphContext() {
  return useContext(SubgraphContext);
}
