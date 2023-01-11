import React, { useEffect, useState } from "react";
import Button from "../../Button/Button";
import { MaticIcon } from "../../svgs/MaticIcon";
import { InfoIcon } from "../../svgs/InfoIcon";
import { TerminalIcon } from "../../svgs/TerminalIcon";
import { VolumeOffIcon } from "../../svgs/VolumeOffIcon";
import { VolumeOnIcon } from "../../svgs/VolumeOnIcon";
import Tooltip from "../../Tooltip/Tooltip";
import styles from "./CoinbetSlotsSection.module.scss";
import coinImage from "../../../assets/images/coin.png";
import BAYC_IMG from "../../../assets/images/BAYC_8817.png";
import CBD_IMG from "../../../assets/images/CBD_139.png";
import Doodles_IMG from "../../../assets/images/Doodles_6914.png";
import MAYC_IMG from "../../../assets/images/MAYC_4849.png";
import Moonbirds_IMG from "../../../assets/images/Moonbirds_2018.png";
import PUNK_IMG from "../../../assets/images/PUNK_5822.png";
import CongratulationModal from "../../Modal/CongratulationModal/CongratulationModal";
import Modal from "../../Modal/Modal";
import { useContractsContext } from "../../../context/contract.context";
import { useWalletContext } from "../../../context/wallet.context";
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
import {
  constructDate,
  constructPayout,
  constructReels,
  hexToDecimal,
} from "../../../utils/utils";
import slotConfig from "../../../coinbet.config.json";
import { useSubgraphContext } from "../../../context/subgraph.context";
import uuid from "react-uuid";
import { formatAddress, formatErrorString } from "../../../utils/format";
import gsap from "gsap";
import { usePolygonScanContext } from "../../../context/polygonscan.context";
import ErrorModal from "../../Modal/StatusModals/ErrorModal/ErrorModal";
import { PlusIcon } from "../../svgs/PlusIcon";
import { MinusIcon } from "../../svgs/MinusIcon";

const settings = {
  apiKey: `${process.env.ALCHEMY_API_KEY}`,
  network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(settings);
const VISIBLE_TILE_SELECTOR = '.tile-2';

const CoinbetSlotsSection = () => {
  const [showCongratulationModal, setShowCongratulationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [volumeOn, setVolumeOn] = useState(false);
  const items = [
    CBD_IMG,
    Moonbirds_IMG,
    Doodles_IMG,
    MAYC_IMG,
    PUNK_IMG,
    BAYC_IMG,
  ];

  const [bet, setBet] = useState({});
  const [spin, setSpin] = useState(new gsap.core.Timeline);
  const [inSpin, setInSpin] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState();

  const { contracts } = useContractsContext();
  const { updateBalance, wallet } = useWalletContext();
  const { subgraph, updateBetsData } = useSubgraphContext();
  const { polygonScanData } = usePolygonScanContext();

  const startAudio = () => {
    var audio = document.getElementById("spinAudio") as HTMLAudioElement;
    audio?.play();
    setVolumeOn(true);
  };

  const pauseAudio = () => {
    var audio = document.getElementById("spinAudio") as HTMLAudioElement;
    audio?.pause();
    setVolumeOn(false);
  };

  useEffect(() => {
    init();
  }, []);

  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  const init = (firstInit = true, groups = 1, duration = 1) => {
    let slots: any = document.querySelectorAll(".slot");

    for (const slot of slots) {

      const boxes = slot.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = [];

      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...items);
      }
      pool.push(...shuffle(arr));
      // pool.push(...arr);

      for (let i = 0; i <= pool.length - 1; i++) {
        const img: HTMLImageElement = document.createElement("img");
        img.src = pool[i].src;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = 'cover'
        const box = document.createElement("div");
        box.classList.add("box");
        box.classList.add(`tile-${i}`);
        box.style.width = slot.clientWidth + "px";
        box.style.height = slot.clientHeight + "px";
        box.style.display = "flex";
        box.style.justifyContent = "center";
        box.style.alignItems = "center";
        box.appendChild(img);
        boxesClone.appendChild(box);
      }
      boxesClone.style.transform = `translateY(${slot.clientHeight / 2}px)`;

      slot.replaceChild(boxesClone, boxes);
    }
  };

  const settleResult = (spinResult: string[]) => {
    // The tiles which are visible when the spin ends
    const visibleTiles = document.querySelectorAll(VISIBLE_TILE_SELECTOR);

    // For each visible tile apply the result
    spinResult.forEach((result, index) => {
      const tileContainer = visibleTiles[index];

      // Remove the current tile image
      while (tileContainer.firstChild) {
        tileContainer.removeChild(tileContainer.firstChild);
      }

      // Construct the new tile
      const nextTileIndex = parseInt(result) - 1;
      const img: HTMLImageElement = document.createElement("img");
      img.src = items[nextTileIndex].src;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = 'cover'

      // Append the new tile to the tile container
      tileContainer.appendChild(img);
    });
  }

  const blurReels = (blur: boolean) => {
    // Get all reels
    const reels = document.querySelectorAll<HTMLElement>('.reel');

    // Construct the blur effect
    const blurEffect = blur ? 'blur(4px)' : 'blur(0px)';

    // Apply the effect
    reels.forEach(reel => reel.style.filter = blurEffect);
  }

  const handleSpin = async () => {
    blurReels(true);
    setSpin(verticalLoop(".boxes .box", 3000).play())
  };

  // speed can be positive or negative (in pixels per second)
  function verticalLoop(elements: any, speed: any) {
    elements = gsap.utils.toArray(elements);
    let firstBounds = elements[0].getBoundingClientRect(),
      lastBounds = elements[elements.length - 1].getBoundingClientRect(),
      top = firstBounds.top - firstBounds.height - Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom),
      bottom = lastBounds.top,
      distance = bottom - top,
      duration = Math.abs(distance / speed),
      tl = gsap.timeline({ repeat: -1 }),
      plus = speed < 0 ? "-=" : "+=",
      minus = speed < 0 ? "+=" : "-=";
    elements.forEach((el: any) => {
      let bounds = el.getBoundingClientRect(),
        ratio = Math.abs((bottom - bounds.top) / distance);
      if (speed < 0) {
        ratio = 1 - ratio;
      }
      tl.to(el, {
        y: plus + distance * ratio,
        duration: duration * ratio,
        ease: "none",
      }, 0);
      tl.fromTo(el, {
        y: minus + distance
      }, {
        y: plus + (1 - ratio) * distance,
        ease: "none",
        duration: (1 - ratio) * duration,
        immediateRender: false
      }, duration * ratio)
    });
    return tl;
  }

  useEffect(() => {
    // Define the event which Alchemy should listen to
    const filter = {
      address: `${process.env.COINBET_SLOT_GAME_CONTRACT}`,
      topics: [
        ethers.utils.id(
          "BetSettled(uint256,uint256,uint256,uint256,uint256,address)"
        ),
      ],
    };
    if (wallet) {
      alchemy.ws.on(filter, (log) => {
        // Decode the raw event data to readable data
        const eventData = ethers.utils.defaultAbiCoder.decode(
          ["uint256", "uint256", "uint256", "uint256", "uint256", "address"],
          log.data
        );
        // Update data in live feed

        updateBetsData({
          id: uuid(),
          playerAddress: formatAddress(eventData[5]),
          payout: constructPayout(eventData[3]),
          date: constructDate(Math.floor(Date.now() / 1000)),
          results: constructReels(
            eventData[0].toString(),
            eventData[1].toString(),
            eventData[2].toString()
          ),
        });

        // Check if reward is grater than 0 and the current logged address is equal to the winner address
        // in order to show the win modal
        if (
          hexToDecimal(eventData[3]._hex) > 0 &&
          eventData[5].toLowerCase() == wallet?.address.toLowerCase()
        ) {
          setBet({
            firstReel: eventData[0],
            secondReel: eventData[1],
            thirdReel: eventData[2],
            winAmount: eventData[3],
            requestId: eventData[4],
            player: eventData[5],
          });
          setTimeout(() => setShowCongratulationModal(true), 100);
        } else {
          console.log("You lose!");
        }
        spin.pause();
        init(false, 1, 2);

        // Update the visible tiles on the reels to match the result
        settleResult([
          eventData[0].toString(),
          eventData[1].toString(),
          eventData[2].toString()
        ]);
        blurReels(false);

        // Enable Spin button for consequitive spins
        setInSpin(false);
      });
    }
    return () => {
      alchemy.ws.off(filter);
    };
  }, [wallet]);

  const handleSpinTxn = async () => {
    try {
      setInSpin(true);
      const coinbetTxn = await contracts?.coinbetSlotGame.coinbet({
        value: ethers.utils.parseUnits(betAmount.toString(), 'ether')
      });
      handleSpin();
      await coinbetTxn.wait();
      updateBalance();
    } catch (error: any) {
      setShowErrorModal(true);
      setErrorModalMessage(formatErrorString(error.reason));
      setInSpin(false);
    }
  };

  const onModalClose = async () => {
    setShowCongratulationModal(false);
    updateBalance();
  };

  const navigateToContract = () => {
    window.open(
      `https://polygonscan.com/address/${process.env.COINBET_SLOT_GAME_CONTRACT}`
    );
  };

  const updateBetAmount = async (operation: string) => {
    if (operation == "add") {
      setBetAmount(betAmount + 1);
    } else if (operation == "subtract"){
      if (betAmount <= 1) {
        setBetAmount(betAmount);
      } else {
        setBetAmount(betAmount - 1);
      }
    }
  }

  return (
    <div className={styles["coinbet-slots-section"]}>
      <div className={styles["coinbet-slots-header"]}>
        <div className={styles["coinbet-slots-header-left"]}>
          <h3>NFT Degen Slots</h3>
          <div className={styles["coinbet-slots-header-left-icons"]}>
            <div className={styles["icon"]}>
              <InfoIcon />
              <Tooltip text="Built on Polygon, Powered by Chainlink." />
            </div>
            <div className={styles["icon"]}>
              <div onClick={navigateToContract}>
                <TerminalIcon />{" "}
              </div>
              <Tooltip text="View Contract" />
            </div>
            <div className={styles["icon"]}>
              <audio id="spinAudio">
                <source src="/spin.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              {!volumeOn ? (
                <div onClick={startAudio} className={styles["volume-icon"]}>
                  <VolumeOffIcon />
                </div>
              ) : (
                <div onClick={pauseAudio} className={styles["volume-icon"]}>
                  <VolumeOnIcon />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles["coinbet-slots-header-right"]}>
          <div>
            <span>Hit Rate:</span>
            <span>{slotConfig.hitRate}</span>
          </div>
          <div>
            <span>RTP:</span>
            <span>{slotConfig.rtp}</span>
          </div>
        </div>
      </div>
      <div className={styles["coinbet-slots-body"]}>
        <div className={styles["current-slots"]}>
          <div className={`slot ${styles["slot"]} reel`}>
            <div className={`boxes ${styles["boxes"]}`}>
              {/* <Image src={coinImage} alt="coin" /> */}
            </div>
          </div>
          <div className={`slot ${styles["slot"]} reel`}>
            <div className={`boxes ${styles["boxes"]}`}>
              {/* <Image src={coinImage} alt="coin" /> */}
            </div>
          </div>
          <div className={`slot ${styles["slot"]} reel`}>
            <div className={`boxes ${styles["boxes"]}`}>
              {/* <Image src={coinImage} alt="coin" /> */}
            </div>
          </div>
          <div className={styles["spin-btn"]}>
            <Button
              variant="primary"
              size="large"
              onClick={handleSpinTxn}
              disabled={inSpin}
            >
              Spin Now
            </Button>
          </div>
          <div className={styles["bet-actions"]}>
            <div>
              <Button
              variant="secondary"
              size="medium"
              icon={<MinusIcon />}
              onClick={() => {updateBetAmount("subtract")}}
            >
            </Button>
            </div>
            <div className={styles["bet-count"]}>
              <MaticIcon />
              { betAmount }
            </div>
            <div>
              <Button
                variant="secondary"
                size="medium"
                icon={<PlusIcon />}
                onClick={() => {updateBetAmount("add") }}
              >
              </Button></div>
          </div>
        </div>
      </div>
      <div className={styles["coinbet-slots-footer"]}>
        <div>
          <h3>Total Spins</h3>
          <p>{subgraph?.betStatistics?.totalBets || 0}</p>
        </div>
        <div>
          <h3>Degens Playing</h3>
          <p>{subgraph?.betStatistics?.playersCount || 0}</p>
        </div>
        <div>
          <h3>Total Volume</h3>
          <p>
            <MaticIcon />
            {ethers.utils.commify(
              parseFloat(
                ethers.utils.formatUnits(
                  subgraph?.betStatistics?.totalBetsVolume || 0,
                  18
                )
              ).toFixed(2)
            )}
          </p>
        </div>
        <div>
          <h3>Rewards Paid</h3>
          <p>
            <MaticIcon />
            {ethers.utils.commify(
              parseFloat(
                ethers.utils.formatUnits(
                  subgraph?.betStatistics?.totalRewardsVolume || 0,
                  18
                )
              ).toFixed(2)
            )}
          </p>
        </div>
      </div>
      <Modal
        open={showCongratulationModal}
        onClose={() => setShowCongratulationModal(false)}
      >
        <CongratulationModal onClose={() => onModalClose()} bet={bet} />
      </Modal>
      <Modal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      >
        <ErrorModal onClose={() => { setShowErrorModal(false); setErrorModalMessage("") }} errorMessage={errorModalMessage} />
      </Modal>
    </div>
  );
};

export default CoinbetSlotsSection;
