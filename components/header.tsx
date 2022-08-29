import { Box, Container, Text } from "@chakra-ui/react"
import WalletConnectionButton from "./buttons/wallet-connection-button"
import Link from "next/link"
import WalletDisplayButton from "./buttons/wallet-display-button"

const Header = () => {
  return (
    <Box  py="md" sx={{ textAlign: "center", borderBottom: "1px solid lightgray" }}>
      <Container>
          <Text
            variant="gradient"
            sx={{ fontSize: "1.5em", fontWeight: 800 }}
          >
            <Link href="/">Coinbet</Link>
          </Text>

          {/* pushes the succeeding contents to the right */}
          <span style={{ flexGrow: 1 }} />

          <WalletConnectionButton />
          <WalletDisplayButton />
      </Container>
    </Box>
  )
}

export default Header
