import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import SlotGame from "../../components/SlotGame/SlotGame";

const SlotGamePage: NextPage = () => {
  return (
    <>
    <NextSeo
    title="Play Decentralized Blockchain Games on Coinbet - Web 3.0 Betting Experience"
    description="Experience the future of online gambling on Coinbet - the decentralized Web 3.0 betting protocol. Connect your Metamask wallet and play provably fair blockchain games. Win big and earn yield through bankrolling."
    openGraph={{
      type: 'website',
      title: `Play Decentralized Blockchain Games on Coinbet - Web 3.0 Betting Experience`,
      description: `Experience the future of online gambling on Coinbet - the decentralized Web 3.0 betting protocol. Connect your Metamask wallet and play provably fair blockchain games. Win big and earn yield through bankrolling.`,
      images: [
        {
          url: `https://play.coinbet.finance/preview.png`,
          width: 1200,
          height: 627,
          alt: 'Play Decentralized Blockchain Games on Coinbet - Web 3.0 Betting Experience',
        },
      ],
    }}
  />
  <SlotGame />
  </>
  );
};
export default SlotGamePage;
