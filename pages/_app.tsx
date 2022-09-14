import { AppProps } from "next/app";
import "../styles/globals.scss";
import { WalletContextWrapper } from "../context/wallet.context";
import Layout from "../components/layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Layout>
        <WalletContextWrapper>
          <Component {...pageProps} />
        </WalletContextWrapper>
      </Layout>
    </>
  );
}
