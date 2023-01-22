import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import HowToUse from "../../components/HowToUse/HowToUse";

const HowToUsePage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Coinbet FAQ - Get answers to your questions on our decentralized Web 3.0 betting protocol"
        description="Find answers to your questions about Coinbet, the decentralized Web 3.0 betting protocol. Learn about our platform, how to connect your Metamask wallet, and how to bankroll and earn yield through our liquidity pools. Discover the future of decentralized gambling with Coinbet."
        openGraph={{
          type: 'website',
          title: `Coinbet FAQ - Get answers to your questions on our decentralized Web 3.0 betting protocol`,
          description: `Find answers to your questions about Coinbet, the decentralized Web 3.0 betting protocol. Learn about our platform, how to connect your Metamask wallet, and how to bankroll and earn yield through our liquidity pools. Discover the future of decentralized gambling with Coinbet.`,
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
      <HowToUse />
    </>

  );
};
export default HowToUsePage;
