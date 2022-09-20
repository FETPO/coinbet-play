import type { NextPage } from "next";
import Head from "next/head";
import SlotGame from "../components/SlotGame/SlotGame";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <SlotGame />
    </>
  );
};

export default Home;
