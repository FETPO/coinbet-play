import { ethers } from "ethers"
import { BaseProvider } from "@ethersproject/providers"

export type WalletType = {
  network: ethers.providers.Network // Current network
  provider: BaseProvider // Provider
  chainId: number // Current chain ID (decimal)
  library: ethers.providers.Web3Provider // Web3Provider library
  address: string // Address of this wallet (i.e. account)
  balance: ethers.BigNumber | undefined// The account balance in native currency
}
export type WalletContextType = {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  updateBalance: () => Promise<void>
  switchChain: () => Promise<void>
  wallet: WalletType | undefined,
  showWalletModal: boolean,
  toggleWalletModal: (v: boolean) => void
  availableWallets: AvailableWallet[],
  selectedWallet: AvailableWallet | null,
  setSelectedWallet: (v: AvailableWallet) => void,
  showInstallWalletModal: boolean,
  setShowInstallWalletModal: (v: boolean) => void,
}

// Indicating available wallets for wallet modal
export type AvailableWallet = {
  id: string
  name: string
  icon?: JSX.Element
};