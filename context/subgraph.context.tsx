import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import { useWalletContext } from "./wallet.context";
import { SubgraphContextType, SubgraphType } from "../types/subgraph";
import {
  betsStatisticsEntity,
  betSettledEntities,
  queryCoinbetSubgraphData,
} from "../utils/graphql/queries";

const SubgraphContext = createContext<SubgraphContextType>({
  subgraph: undefined,
});

export const SubgraphContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [subgraph, setSubgraph] = useState<SubgraphType>();
  const { wallet } = useWalletContext();

  useEffect(() => {
    const initSubgraph = async () => {
      const betsStats = await queryCoinbetSubgraphData(betsStatisticsEntity());
      const settledBets = await queryCoinbetSubgraphData(betSettledEntities());
      setSubgraph({
        settledBets: settledBets.betSettledEntities,
        betStatistics: betsStats.betsStatisticsEntity,
      });
    };

      initSubgraph();

  }, [wallet]);

  return (
    <SubgraphContext.Provider
      value={{
        subgraph,
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
