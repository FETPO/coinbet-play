import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import type {
  PolygonScanContextType,
  PolygonScanType,
} from "../types/polygonscan";
import axios from "axios";

const PolygonScanContext = createContext<PolygonScanContextType>({
  fetchPolygonScanData: async () => {},
  polygonScanData: undefined,
});

export const PolygonScanContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [polygonScanData, setPolygonScanData] = useState<PolygonScanType>();

  useEffect(() => {
    fetchPolygonScanData();
  }, []);

  const fetchPolygonScanData = async () => {
    const tokenPrice = await axios.get(
      `${process.env.POLYGONSCAN_API_STATS}${process.env.POLYGONSCAN_API_KEY}`
    );
    const gasTracker = await axios.get(
      `${process.env.POLYGONSCAN_API_GASTRACKER}${process.env.POLYGONSCAN_API_KEY}`
    );
    setPolygonScanData({
      maticPriceUsd: tokenPrice?.data?.result?.maticusd,
      latestBlock: gasTracker?.data?.result?.LastBlock,
      gasPrice: gasTracker?.data?.result?.FastGasPrice,
    });
  };

  return (
    <PolygonScanContext.Provider
      value={{
        fetchPolygonScanData,
        polygonScanData,
      }}
    >
      {children}
    </PolygonScanContext.Provider>
  );
};

// custom hook
export function usePolygonScanContext() {
  return useContext(PolygonScanContext);
}
