import { BigNumber, ethers } from "ethers";
import { formatAddress } from "./format";

import NFT1 from "../assets/images/CBD_139.png";
import NFT2 from "../assets/images/Moonbirds_2018.png";
import NFT3 from "../assets/images/Doodles_6914.png";
import NFT4 from "../assets/images/MAYC_4849.png";
import NFT5 from "../assets/images/PUNK_5822.png";
import NFT6 from "../assets/images/BAYC_8817.png";
import uuid from "react-uuid";

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

// truncates an address
export const truncateAddress = (acc: string): string => {
  if (acc !== "") return acc.slice(0, 5) + "..." + acc.slice(-3);
  else return "";
};

// converts a decimal number to hexadecimal
export const decimalToHex = (dec: number): number => {
  return parseInt(dec.toString(16));
};

// converts a hexadecimal number to decimal
export const hexToDecimal = (hex: number): number => {
  return parseInt(hex.toString(), 16);
};

// converts a block timestamp number to a date object
export const blockTimestampToDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000); // converts to ms, and then to number
};

// converts a block timestamp bignumber to a date object
export const blockBigTimestampToDate = (timestamp: BigNumber): Date => {
  return new Date(timestamp.mul(1000).toNumber()); // converts to ms, and then to number
};

// returns a random unique string
export const randomUniqueString = (): string => {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

// formats big numbers to string
export const formatBigNumber = (number: BigNumber | undefined): string => {
  return (+ethers.utils.formatEther(number || 0)).toFixed(3);
};

// formats USD price
export const formatUsdPrice = (
  usdPricePerCoin: string | undefined,
  coinAmount: BigNumber | undefined
): string => {
  return (
    parseFloat(usdPricePerCoin || "0") * parseFloat(formatBigNumber(coinAmount))
  ).toFixed(2);
};

// Formats settled bets data to readable format
export const processSettledBetsData = (bets: any[]) => {
  return bets.map((bet) => {
    return {
      id: uuid(),
      playerAddress: formatAddress(bet.player),
      fullAddress: bet.player,
      payout: constructPayout(bet.reward),
      date: constructDate(bet.timestamp),
      results: constructReels(bet.first, bet.second, bet.third),
      isJackpot: isJackpot(bet.first, bet.second, bet.third),
    };
  });
};

// Constructs a date from UNIX timestamp
export const constructDate = (timestamp: any) => {
  const date = new Date(timestamp * 1000);
  return `${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
};

// Gets a UTC Timestamp
export const getUtcTimestamp = () => {
  let now = new Date();
  return (
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    ) / 1000
  );
};

export const setNewTime = (
  setCountdown: any,
  epochEnds: BigNumber | undefined
) => {
  if (epochEnds) {
    const currentTime = getUtcTimestamp();
    const countdownDate = epochEnds.toNumber();

    let distanceToDateInMilliseconds = (countdownDate - currentTime) * 1000;
    let daysLeft = Math.floor(
      distanceToDateInMilliseconds / (1000 * 60 * 60 * 24)
    );
    let hoursLeft = Math.floor(
      (distanceToDateInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutesLeft = Math.floor(
      (distanceToDateInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    let secondsLeft = Math.floor(
      (distanceToDateInMilliseconds % (1000 * 60)) / 1000
    );

    setCountdown({
      days: daysLeft > 0 ? daysLeft : 0,
      hours: hoursLeft > 0 ? hoursLeft : 0,
      minutes: minutesLeft > 0 ? minutesLeft : 0,
      seconds: secondsLeft > 0 ? secondsLeft : 0,
    });
  }
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

export const isJackpot = (first: string, second: string, third: string) => {
  if (first == second && second == third) {
    return true;
  } else {
    return false;
  }
};

export const epochTerm = (
  epochStartedAt: BigNumber | undefined,
  epochEndsAt: BigNumber | undefined
): string => {
  const epochStartDate = new Date(
    (epochStartedAt?.toNumber() || 0) * 1000 || 0
  );
  const epochEndDate = new Date((epochEndsAt?.toNumber() || 0) * 1000 || 0);

  return `${month[epochStartDate.getMonth()]} ${epochStartDate.getDate()} - ${
    month[epochEndDate.getMonth()]
  } ${epochEndDate.getDate()}  ${epochEndDate.getFullYear()}`;
};
