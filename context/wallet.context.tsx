import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { hexToDecimal, truncateAddress } from "../utils/utility";
import type { WalletContextType, WalletType } from "../types/wallet";

const WalletContext = createContext<WalletContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
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
        if (accounts.length) {
          setWallet({
            provider,
            library,
            network,
            address: accounts[0], // always get the first account (topmost),
            chainId: network.chainId,
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
      if (accounts) {
        setWallet({
          provider,
          library,
          network,
          address: accounts[0], // always get the first account (topmost),
          chainId: network.chainId,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const handleAccountsChanged = (accounts: string[]) => {
      if (!(accounts && accounts.length > 0)) return;
      setWallet({ ...wallet, address: accounts[0] });
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
