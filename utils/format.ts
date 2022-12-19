export const formatAddress = (addr: string | undefined) =>
  `${addr?.slice(0, 6)}...${addr?.slice(-4)}`;

  export const formatErrorString = (error: string) => {
    const stringToBeRemoved = "execution reverted: ";
    return error?.slice(stringToBeRemoved.length, error.length);
  }