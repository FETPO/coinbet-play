import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export const betsStatisticsEntity = () => `
  query BetStatisticsEntity {
    betsStatisticsEntity(id: "0x1") {
        totalBets
        totalBetsVolume
        totalRewardsVolume
        players
        playersCount
      }
  }
`;

export const betSettledEntities = () => `
  query BetSettledEntities {
    betSettledEntities(first: 15, orderBy: timestamp, orderDirection: desc) {
        first
        second
        third
        reward
        player
        timestamp
      }
  }
`;

export const queryCoinbetSubgraphData = async (graphQuery: any) => {
  const client = new ApolloClient({
    uri: process.env.COINBET_SUBGRAPH,
    cache: new InMemoryCache(),
  });

  const graphData = await client.query({
    query: gql`
      ${graphQuery}
    `,
  });

  return graphData?.data;
};
