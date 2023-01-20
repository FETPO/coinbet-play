import { AppProps } from "next/app";
import "../styles/globals.scss";
import { WalletContextWrapper } from "../context/wallet.context";
import Layout from "../components/layout";
import NProgress from 'nprogress';
import { ThemeProvider } from "next-themes";
import { PolygonScanContextWrapper } from "../context/polygonscan.context";
import { ContractsContextWrapper } from "../context/contract.context";
import { AlchemyContextWrapper } from "../context/alchemy.context";
import { SubgraphContextWrapper } from "../context/subgraph.context";
import { Router } from "next/router";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider defaultTheme="dark">
      <PolygonScanContextWrapper>
        <WalletContextWrapper>
          <AlchemyContextWrapper>
            <ContractsContextWrapper>
              <SubgraphContextWrapper>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              </SubgraphContextWrapper>
            </ContractsContextWrapper>
          </AlchemyContextWrapper>
        </WalletContextWrapper>
      </PolygonScanContextWrapper>
    </ThemeProvider>
  );
}
