import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import RewardPool from "../../components/RewardPool/RewardPool";

const RewardPoolPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Join Coinbet's Decentralized Liquidity Pools - Earn High Yield on Web 3.0 Betting Protocol"
        description="Become a liquidity provider in Coinbet's decentralized pools and earn high yield by bankrolling our web 3.0 betting games. Join now and experience the future of decentralized finance on our platform."
        openGraph={{
          type: 'website',
          title: `Join Coinbet's Decentralized Liquidity Pools - Earn High Yield on Web 3.0 Betting Protocol`,
          description: `Become a liquidity provider in Coinbet's decentralized pools and earn high yield by bankrolling our web 3.0 betting games. Join now and experience the future of decentralized finance on our platform.`,
          images: [
            {
              url: `https://play.coinbet.finance/preview.png`,
              width: 1200,
              height: 627,
              alt: `Join Coinbet's Decentralized Liquidity Pools - Earn High Yield on Web 3.0 Betting Protocol`,
            },
          ],
        }}
      />
      <RewardPool />
    </>
  );
};
export default RewardPoolPage;
