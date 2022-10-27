export type PolygonScanType = {
  maticPriceUsd: string;
  latestBlock: string;
  gasPrice: string;
};
export type PolygonScanContextType = {
  fetchPolygonScanData: () => Promise<void>;
  polygonScanData: PolygonScanType | undefined;
};
