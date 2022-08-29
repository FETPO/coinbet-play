import { AppProps } from "next/app"
import { useState } from "react"
import Head from "next/head"
// global styles
import "../styles/globals.scss"
import { WalletContextWrapper } from "../context/wallet.context"
import { ChakraProvider } from "@chakra-ui/react"
import { Theme } from '../theme/Theme'
import Layout from "../components/layout"


export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>  
      <Layout>
        <WalletContextWrapper>
          <Component {...pageProps} />
        </WalletContextWrapper>
      </Layout>
    </>
  )
}
