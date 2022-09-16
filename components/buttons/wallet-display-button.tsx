import { Popover, Button, Stack, Text, Image, Heading, Box } from "@chakra-ui/react"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { useState, useEffect, FC } from "react"
import { Wallet } from "tabler-icons-react"
import getNetwork, { unknownNetwork } from "../../constants/networks"
import { useWalletContext } from "../../context/wallet.context"
import type { NetworkInfoType } from "../../types/networks"
import { truncateAddress } from "../../utils/utility"

const WalletDisplayButton: FC = () => {
  const { wallet } = useWalletContext()
  const [opened, setOpened] = useState(false)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const [network, setNetwork] = useState<NetworkInfoType>(unknownNetwork)

  useEffect(() => {
    if (wallet) {
      wallet.library.getBalance(wallet.address).then((val) => setBalance(val))
      setNetwork(getNetwork(wallet.chainId))
    } else {
      setBalance(BigNumber.from(0))
      setNetwork(unknownNetwork)
    }
  }, [wallet])

  return (
    <>      {wallet ? (
        <Box>
          <Stack>
            {/* Network Details */}
            <Heading order={2}>Network</Heading>
            <Text size="xl">{network.chainName}</Text>
            <Text color="dimmed">Chain ID: {wallet.chainId}</Text>

            {/* Wallet Details */}
            <Heading order={2} mt="md">
              Wallet ID
            </Heading>
            <Text>{truncateAddress(wallet.address)}</Text>

            {/* Balance */}
            <Heading order={2} mt="md">
              Balance
            </Heading>
            <Text>{formatEther(balance) + " " + network.nativeCurrency.symbol}</Text>
          </Stack>
          <Image src={network.iconURL} alt="network icon" m="md" width={150} height={200} fit="contain" />
        </Box>
      ) : (
        <Heading p="lg">Wallet not connected.</Heading>
      )}</>

  )
}

export default WalletDisplayButton
