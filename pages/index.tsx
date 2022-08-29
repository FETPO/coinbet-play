import type { NextPage } from "next"
import { Text, Heading, Box } from "@chakra-ui/react"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>       
    <Head>
      <title>NextJS + Web3 Starter</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" content="A NextJS + Web3 starter template, supporting Hardhat with TypeScript." />
    </Head>
    </>
  )
}

export default Home
