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
        const library = new ethers.providers.Web3Provider(provider, "any");
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        const balance = await library.getBalance(accounts[0]);
        if (accounts.length) {
          setWallet({
            provider,
            library,
            network,
            address: accounts[0], // always get the first account (topmost),
            chainId: network.chainId,
            balance: balance,
          });
        } else {
        }
      }
    };
    updateConnectionOnFirstLogin();
  }, []);

  // retrieves the provider from Web3Modal, and then sets the context wallet
  const connectWallet = async () => {
    try {
      const provider = await web3Modal!.connect();
      const library = new ethers.providers.Web3Provider(
        provider,
        "any" // important for switching networks! https://github.com/NoahZinsmeister/web3-react/issues/127
      );
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      const balance = await library.getBalance(accounts[0]);
      if (accounts) {
        setWallet({
          provider,
          library,
          network,
          address: accounts[0], // always get the first account (topmost),
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
  }

  // sets the wallet context to be undefined.
  const disconnectWallet = () => {
    try {
      web3Modal?.clearCachedProvider();
      setWallet(undefined);
    } catch (error) {}
  };

  useEffect(() => {
    if (!(wallet && wallet.provider.on)) return;

    // account changed
    const handleAccountsChanged = async (accounts: string[]) => {
      if (!(accounts && accounts.length > 0)) return;
      const balance = await wallet.library.getBalance(accounts[0]);
      setWallet({ ...wallet, address: accounts[0], balance: balance });
    };

    // network chain changed
    const handleChainChanged = (chainId: number) => {
      const newChainId = hexToDecimal(chainId);
      setWallet({ ...wallet, chainId: newChainId });
      // @note: you can add a "supported-chain check" here if you want
    };

    // wallet is disconnected from the injected provider
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
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        updateBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// custom hook
export function useWalletContext() {
  return useContext(WalletContext);
}
