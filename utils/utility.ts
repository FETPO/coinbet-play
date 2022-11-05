import { BigNumber, ethers } from "ethers";

import NFT1 from "../assets/images/CBD_139.png";
import NFT2 from "../assets/images/Moonbirds_2018.png";
import NFT3 from "../assets/images/Doodles_6914.png";
import NFT4 from "../assets/images/MAYC_4849.png";
import NFT5 from "../assets/images/PUNK_5822.png";
import NFT6 from "../assets/images/BAYC_8817.png";
import uuid  from 'react-uuid';
import { formatAddress } from "./format";
// truncates an address
export function truncateAddress(acc: string): string {
  if (acc !== "") return acc.slice(0, 5) + "..." + acc.slice(-3);
  else return "";
}

// converts a decimal number to hexadecimal
export function decimalToHex(dec: number): number {
  return parseInt(dec.toString(16));
}

// converts a hexadecimal number to decimal
export function hexToDecimal(hex: number): number {
  return parseInt(hex.toString(), 16);
}

// converts a block timestamp number to a date object
export function blockTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000); // converts to ms, and then to number
}

// converts a block timestamp bignumber to a date object
export function blockBigTimestampToDate(timestamp: BigNumber): Date {
  return new Date(timestamp.mul(1000).toNumber()); // converts to ms, and then to number
}

// returns a random unique string
export function randomUniqueString(): string {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function formatBigNumber(number: BigNumber | undefined): string {
  return (+ethers.utils.formatEther(number || 0)).toFixed(3);
}

export function formatUsdPrice(
  usdPricePerCoin: string | undefined,
  coinAmount: BigNumber | undefined
): string {
  return (
    parseFloat(usdPricePerCoin || "0") * parseFloat(formatBigNumber(coinAmount))
  ).toFixed(2);
}

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const reelMapping = [NFT1, NFT2, NFT3, NFT4, NFT5, NFT6];

export const processSettledBetsData = (bets: any[]) => {
  return bets.map((bet) => {
    return {
      id: uuid(),
      playerAddress: formatAddress(bet.player),
      payout: constructPayout(bet.reward),
      date: constructDate(bet.timestamp),
      results: constructReels(bet.first, bet.second, bet.third),
    };
  });
};

export const constructDate = (timestamp: any) => {
  const date = new Date(timestamp * 1000);
  return `${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
};

export const constructPayout = (payout: string) => {
  if (payout == "0") {
    return "0";
  } else {
    return parseFloat(ethers.utils.formatUnits(payout, 18)).toFixed(3);
  }
};

export const constructReels = (
  first: string,
  second: string,
  third: string
) => {
  return [
    {
      id: uuid(),
      imageURL: reelMapping[parseInt(first) - 1],
    },
    {
      id: uuid(),
      imageURL: reelMapping[parseInt(second) - 1],
    },
    {
      id: uuid(),
      imageURL: reelMapping[parseInt(third) - 1],
    },
  ];
};
