import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { useWalletContext } from "../../context/wallet.context"

const WalletConnectionButton: FC = () => {
  const { disconnectWallet, connectWallet, wallet } = useWalletContext()

  return (
    <Button
      variant={'primary'}
      onClick={() => (wallet ? disconnectWallet() : connectWallet())}
    >
      {wallet ? "Disconnect" : "Connect"}
    </Button>
  )
}

export default WalletConnectionButton
