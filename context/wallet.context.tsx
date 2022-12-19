import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { decimalToHex, hexToDecimal } from "../utils/utils";
import type { WalletContextType, WalletType } from "../types/wallet";
import { supportedNetworks } from "../utils/supportedNetworks";

const WalletContext = createContext<WalletContextType>({
  connectWallet: async () => { },
  disconnectWallet: () => { },
  updateBalance: async () => { },
  switchChain: async () => { },
  wallet: undefined,
});

export const WalletContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const [wallet, setWallet] = useState<WalletType>();

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        cacheProvider: true,
      })
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
          const balance = await library.getBalance(provider.selectedAddress);
          setWallet({
            provider,
            library,
            network,
            address: provider.selectedAddress,
            chainId: network.chainId,
            balance: balance,
          });
        } else {
          console.log("No Web3 Provider detected");
        }
      }
    };
    updateConnectionOnRefresh();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal!.connect();
      const library = new ethers.providers.Web3Provider(provider, "any");
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      const balance = await library.getBalance(accounts[0]);
      if (accounts) {
        setWallet({
          provider,
          library,
          network,
          address: accounts[0],
          chainId: network.chainId,
          balance: balance,
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
    setWallet({ ...wallet, balance: balance });
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
        setWallet({ ...wallet, address: accounts[0], balance: balance });
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
        switchChain
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  return useContext(WalletContext);
}
