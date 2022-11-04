import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { hexToDecimal } from "../utils/utility";
import type { WalletContextType, WalletType } from "../types/wallet";

const WalletContext = createContext<WalletContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
  updateBalance: async () => {},
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
    const updateConnectionOnFirstLogin = async () => {
      if (typeof window.ethereum !== "undefined") {
        let provider = window.ethereum;
        if (provider.selectedAddress) {
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
        }
      }
    };
    updateConnectionOnFirstLogin();
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
    } catch (error) {}
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletContext() {
  return useContext(WalletContext);
}
