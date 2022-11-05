import { AppProps } from "next/app";
import "../styles/globals.scss";
import { WalletContextWrapper } from "../context/wallet.context";
import Layout from "../components/layout";
import { ThemeProvider } from "next-themes";
import { PolygonScanContextWrapper } from "../context/polygonscan.context";
import { ContractsContextWrapper } from "../context/contract.context";
import { AlchemyContextWrapper } from "../context/alchemy.context";
import { SubgraphContextWrapper } from "../context/subgraph.context";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider>
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
