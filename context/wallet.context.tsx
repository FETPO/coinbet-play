import { createContext, useContext, useState, useEffect, useId, useMemo } from "react";
import type { FC, ReactNode } from "react";
import Web3Modal from "web3modal";
import CoinbetTokenContract from "../contracts/CoinbetToken.json";
import { Contract, ethers } from "ethers";
import { decimalToHex, hexToDecimal } from "../utils/utils";
import type { WalletContextType, WalletType, AvailableWallet } from "../types/wallet";
import { supportedNetworks } from "../utils/supportedNetworks";
import { MiniMetamaskIcon } from "../components/svgs/MiniMetamaskIcon";
import { MiniCoinbaseIcon } from "../components/svgs/MiniCoinbaseIcon";
import { MiniWalletConnectIcon } from "../components/svgs/MiniWalletConnectIcon";

const WalletContext = createContext<WalletContextType>({
  connectWallet: async () => { },
  disconnectWallet: () => { },
  updateBalance: async () => { },
  switchChain: async () => { },
  wallet: undefined,
  showWalletModal: false,
  toggleWalletModal: () => { },
  availableWallets: [],
  selectedWallet: null,
  setSelectedWallet: () => { },
  showInstallWalletModal: false,
  setShowInstallWalletModal: () => { }
});

export const WalletContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [wallet, setWallet] = useState<WalletType>();
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [showInstallWalletModal, setShowInstallWalletModal] = useState<boolean>(false);
  const availableWallets = [
    {
      id: useId(),
      name: "MetaMask",
      icon: <MiniMetamaskIcon />,
    },
    {
      id: useId(),
      name: "Coinbase Wallet",
      icon: <MiniCoinbaseIcon />,
    },
    // {
    //   id: useId(),
    //   name: "WalletConnect",
    //   icon: <MiniWalletConnectIcon />,
    // },
  ];
  const [selectedWallet, setSelectedWallet] = useState<AvailableWallet | null>(availableWallets[0]);

  const alchemyProvider = useMemo(() => {
    return new ethers.providers.AlchemyProvider(
      `${process.env.ALCHEMY_NETWORK}`,
      `${process.env.ALCHEMY_API_KEY}`
    )
  }, []);

  const coinbetToken = useMemo(() => {
    return new Contract(
      process.env.COINBET_TOKEN_CONTRACT as any,
      CoinbetTokenContract?.abi,
      alchemyProvider
    )
  }, [alchemyProvider]);

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal()
    );

    return () => {
      setWeb3Modal(undefined);
    };
  }, []);

  useEffect(() => {
    const updateConnectionOnRefresh = async () => {
      if (typeof window.ethereum !== "undefined") {
        let provider = window.ethereum;
        let selectedAddress = localStorage.getItem("coinbet-wallet");
        if (selectedAddress) {
          const library = new ethers.providers.Web3Provider(provider, "any");
          const network = await library.getNetwork();

          // Fetch this info through Alchemy, for better performance
          const balance = await alchemyProvider.getBalance(provider.selectedAddress);
          const coinbetTokenBalance = await coinbetToken.balanceOf(provider.selectedAddress);

          setWallet({
            provider,
            library,
            network,
            address: provider.selectedAddress,
            chainId: network.chainId,
            balance: balance,
            coinbetTokenBalance: coinbetTokenBalance
          });
        } else {
          console.log("No Web3 Provider detected");
        }
      }
    };
    updateConnectionOnRefresh();
  }, [alchemyProvider, coinbetToken]);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal!.connect();
      const library = new ethers.providers.Web3Provider(provider, "any");
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      const balance = await alchemyProvider.getBalance(accounts[0]);
      const coinbetTokenBalance = await coinbetToken.balanceOf(accounts[0]);
      if (accounts) {
        setWallet({
          provider,
          library,
          network,
          address: accounts[0],
          chainId: network.chainId,
          balance: balance,
          coinbetTokenBalance: coinbetTokenBalance
        });
        localStorage.setItem("coinbet-wallet", accounts[0]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBalance = async () => {
    if (!(wallet && wallet.provider.on)) return;
    const balance = await wallet?.library.getBalance(wallet?.address);
    const coinbetTokenBalance = await coinbetToken.balanceOf(wallet?.address);
    setWallet({ ...wallet, balance: balance, coinbetTokenBalance: coinbetTokenBalance });
  };

  const toggleWalletModal = async (v: boolean) => {
    if (v && typeof window.ethereum === "undefined") {
      setShowInstallWalletModal(true);
      return;
    }

    setShowWalletModal(v);
  };

  const disconnectWallet = () => {
    try {
      web3Modal?.clearCachedProvider();
      setWallet(undefined);
      localStorage.removeItem("coinbet-wallet");
    } catch (error) { }
  };

  const switchChain = async () => {
    const { ethereum } = window;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${decimalToHex(parseInt(process.env.CHAIN_ID || ""))}` }],
      });

    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          const networkToAdd = supportedNetworks.find(network => network.chainId == parseInt(process.env.CHAIN_ID || ""));
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${decimalToHex(parseInt(process.env.CHAIN_ID || ""))}`,
                chainName: networkToAdd?.chainName,
                rpcUrls: networkToAdd?.rpcUrls,
              },
            ],
          });
        } catch (addError) {
          console.log("Error setting network")
        }
      }
    }

    await connectWallet();
  };

  useEffect(() => {
    if (!(wallet && wallet.provider.on)) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts && accounts.length > 0) {
        const balance = await wallet.library.getBalance(accounts[0]);
        const coinbetTokenBalance = await coinbetToken.balanceOf(accounts[0]);
        setWallet({ ...wallet, address: accounts[0], balance: balance, coinbetTokenBalance: coinbetTokenBalance });
      } else {
        try {
          web3Modal?.clearCachedProvider();
          setWallet(undefined);
          localStorage.removeItem("coinbet-wallet");
        } catch (error) {
          console.log(error);
        }
      }
    };

    const handleChainChanged = (chainId: number) => {
      const newChainId = hexToDecimal(chainId);
      setWallet({ ...wallet, chainId: newChainId });
      // TODO:: we should triggering wrong Network modal from here instead of Header.tsx!
    };

    const handleDisconnect = () => {
      setWallet(undefined);
    };

    wallet.provider.on("accountsChanged", handleAccountsChanged);
    wallet.provider.on("chainChanged", handleChainChanged);
    wallet.provider.on("disconnect", handleDisconnect);

    return () => {
      wallet.provider.removeListener("accountsChanged", handleAccountsChanged);
      wallet.provider.removeListener("chainChanged", handleChainChanged);
      wallet.provider.removeListener("disconnect", handleDisconnect);
    };
  }, [wallet, web3Modal]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        updateBalance,
        switchChain,
        toggleWalletModal,
        showWalletModal,
        availableWallets,
        selectedWallet,
        setSelectedWallet,
        showInstallWalletModal,
        setShowInstallWalletModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  return useContext(WalletContext);
}
