import type { NextPage } from "next"
import Layout from "../components/layout"
import { Text, Title, Anchor, Button, Group, Badge, Box } from "@mantine/core"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <Box sx={{ width: "80%", textAlign: "center", margin: "auto" }} my="xl">
          <Title>Coinbet</Title>
          <Text>
              Coinbet protocol brings DeFi to online betting. Permissionless and Decentralised.
          </Text>
        </Box>
      </>
    </Layout>
  )
}

export default Home
