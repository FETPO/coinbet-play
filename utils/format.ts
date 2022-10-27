export const formatAddress = (addr: string | undefined) =>
  `${addr?.slice(0, 6)}...${addr?.slice(-5)}`;
