import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Script from "next/script";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/games");
  });

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container">
        {/* Global site tag (gtag.js) - Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2RV4ZS7V8Q" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-2RV4ZS7V8Q');
            `}
        </Script>
      </div>
    </>
  );
};

export default Home;
