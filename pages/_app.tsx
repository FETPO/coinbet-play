import { AppProps } from "next/app";
import "../styles/globals.scss";
import { WalletContextWrapper } from "../context/wallet.context";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider>
      <WalletContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletContextWrapper>
    </ThemeProvider>
  );
}
