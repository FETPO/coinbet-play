export const formatAddress = (addr: string) =>
  `${addr.slice(0, 6)}...${addr.slice(-5)}`;
