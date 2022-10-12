import { useId } from "react";
import NFT1 from "../../assets/images/NFT1.png";
import NFT2 from "../../assets/images/NFT2.png";
import NFT3 from "../../assets/images/NFT3.png";

export const MyRollsDummyData = () => {
  return [
    {
      id: useId(),
      playerAddress: "0x6d592909746d2d80C5384E0ECB673B24053057A1",
      results: [
        {
          id: useId(),
          imageURL: NFT1
        },
        {
          id: useId(),
          imageURL: NFT2
        },
        {
          id: useId(),
          imageURL: NFT3
        }
      ],
      date: "Sep 14, 5:12 AM",
      payout: "0.05"
    },
    {
      id: useId(),
      playerAddress: "0x6d592909746d2d80C5384E0ECB673B24053057A1",
      results: [
        {
          id: useId(),
          imageURL: NFT2
        },
        {
          id: useId(),
          imageURL: NFT2
        },
        {
          id: useId(),
          imageURL: NFT3
        }
      ],
      date: "Sep 14, 5:12 AM",
      payout: "0.1"
    },
    {
      id: useId(),
      playerAddress: "0x6d592909746d2d80C5384E0ECB673B24053057A1",
      results: [
        {
          id: useId(),
          imageURL: NFT2
        },
        {
          id: useId(),
          imageURL: NFT3
        },
        {
          id: useId(),
          imageURL: NFT3
        }
      ],
      date: "Sep 14, 5:12 AM",
      payout: "0.006"
    },
    {
      id: useId(),
      playerAddress: "0x6d592909746d2d80C5384E0ECB673B24053057A1",
      results: [
        {
          id: useId(),
          imageURL: NFT1
        },
        {
          id: useId(),
          imageURL: NFT2
        },
        {
          id: useId(),
          imageURL: NFT3
        }
      ],
      date: "Sep 14, 5:12 AM",
      payout: "0.08"
    },
    {
      id: useId(),
      playerAddress: "0x6d592909746d2d80C5384E0ECB673B24053057A1",
      results: [
        {
          id: useId(),
          imageURL: NFT1
        },
        {
          id: useId(),
          imageURL: NFT1
        },
        {
          id: useId(),
          imageURL: NFT1
        }
      ],
      date: "Sep 14, 5:12 AM",
      payout: "0.05"
    }
  ];
};
