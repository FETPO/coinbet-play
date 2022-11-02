import styles from "./HowToUse.module.scss";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import BAYC_IMG from "../../assets/images/BAYC_8817.png";
import CBD_IMG from "../../assets/images/CBD_139.png";
import Doodles_IMG from "../../assets/images/Doodles_6914.png";
import MAYC_IMG from "../../assets/images/MAYC_4849.png";
import Moonbirds_IMG from "../../assets/images/Moonbirds_2018.png";
import PUNK_IMG from "../../assets/images/PUNK_5822.png";

const HowToUse = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <>
      <Head>
        <title>Coinbet Play - How to use</title>
        <meta name="description" content="How to use description" />
      </Head>
      <div className={styles["how-to-use-wrapper"]}>
        <div className="container">
          <div className={styles["grid-container"]}>
            <div className={styles["tabs"]}>
              <h3
                className={selectedTabIndex === 0 ? styles["active"] : ""}
                onClick={() => setSelectedTabIndex(0)}
              >
                Info for Rewards Providers
              </h3>
              <h3
                className={selectedTabIndex === 1 ? styles["active"] : ""}
                onClick={() => setSelectedTabIndex(1)}
              >
                Info for Players
              </h3>
            </div>
            <div className={styles["tab-content"]}>
              {selectedTabIndex === 0 ? (
                <div className={styles["wrapper"]}>
                  <div>
                    <h3>What is a Coinbet House Pool?</h3>
                    <p>
                      In simple terms, a Coinbet House Pool is a liquidity pool
                      where everyone can deposit funds to bankroll betting
                      activities of players playing our slot game. Participation
                      in the pool gives you the opportunity to earn yield from
                      the volume generated by people who play the respective
                      game. On the other side, the staked funds are used for
                      paying rewards to the betters. Built on the concept of RTP
                      (Return to Player) ratio, the yield generated is a product
                      of the RTP and the number of bets for a set timeframe.
                    </p>
                  </div>
                  <div>
                    <h3>How does it work?</h3>
                    <p>
                      Depositing funds to the Coinbet House Pool is
                      straightforward. Navigate to the House Pool tab and click
                      the Add Liquidity button. You’ll be prompted with the
                      amount you wish to deposit. Then click Supply and voilà -
                      you are now eligible to earn yield. Once you have
                      deposited your funds, you’ll receive a Coinbet Reward
                      Provider ERC20 token, representing your stake in the pool
                      (in the same way you would provide liquidity to a Uniswap
                      pool, but only with a single token).
                    </p>
                  </div>
                  <div className={styles["example-list"]}>
                    <h3>Let’s take a look in this simplified example:</h3>
                    <p>
                      * You deposit 100 MATIC into the pool which has 900 MATIC
                      already supplied. You receive Coinbet Reward Provider
                      token, representing that you now own 10% of the pool.
                    </p>
                    <p>
                      * After 1 week, you come back and the pool has grown from
                      1000 MATIC to 1100 MATIC (we assume, no additional reward
                      providers have entered).
                    </p>
                    <p>
                      * Now yours 10% stake equals 110 MATIC, which you can
                      withdraw or claim just the difference (10 MATIC), by
                      clicking Withdraw Liquidity and burning the Coinbet Reward
                      Provider token.
                    </p>
                  </div>
                  <div>
                    <h3>Fees</h3>
                    <p>
                      In order to sustain itself, the Coinbet Protocol takes a
                      small fee (5%) on the amount withdrawn from reward
                      providers who exit the pool. This is also to incentivise
                      reward providers to stay in the pool as long as possible
                      in order to generate higher returns.
                    </p>
                  </div>
                  <div>
                    <h3>Future incentives</h3>
                    <p>
                      After the successful release, we plan to incentivise
                      reward providers by creating a Yield Farming pool, where
                      you can stake your Coinbet Reward Provider ERC20 token,
                      and farm $CBET - the governance and utility token of the
                      Coinbet Protocol. Stay tuned.
                    </p>
                  </div>
                  <div>
                    <h3>Security</h3>
                    <p>
                      Our smart contracts have been thoroughly tested and
                      audited by high-ranking private auditors. The smart
                      contract code can be checked through Etherscan, via the
                      link provided in the Slot Game tab. However, please note
                      this is an experimental technology and Coinbet does not
                      take responsibility for any lost funds and smart contract
                      bugs. It is important to note that, when you provide
                      liquidity, in the short term it is possible to experience
                      a deduction in your stake due to winning bets, so we
                      advise to leave your funds for at least a week. In other
                      words, the generated yield grows proportionally to the
                      number of bets taken.
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles["wrapper"]}>
                  <div>
                    <h3>What are Coinbet Slots?</h3>
                    <p>
                      Coinbet Slots is the first of many, truly permissionless
                      and decentralised blockchain casino games powered by
                      Coinbet. Players have full transparency in regard to
                      awarding prizes, using a protocol that runs on fair,
                      transparent, and immutable smart contracts. The backbone
                      of Coinbet’s games is Chainlink’s VRF (Verifiable Random
                      Function), which feeds random numbers to the betting smart
                      contracts. Users who play our games can be confident that
                      their rewards will be paid out fully, as everything is
                      enforced on a smart contract level.
                    </p>
                  </div>
                  <div>
                    <h3>How to play?</h3>
                    <p>
                      Coinbet Slots game is very fun and easy to play. Just
                      connect your wallet and your balance will be automatically
                      detected. Currently, one spin costs a fixed amount of 1
                      MATIC. Once you’re connected, just hit spin to move the
                      slots and execute a transaction. Once the transaction is
                      finished, your wallet will be directly credited in case
                      your bet is winning.
                    </p>
                  </div>
                  <div>
                    <h3>Fees</h3>
                    <p>
                      In order to sustain itself, the Coinbet Slots game charges
                      a small fee (2%) on each spin/bet.
                    </p>
                  </div>
                  <div>
                    <h3>Edge and RTP</h3>
                    <div className={styles["edge-rtp"]}>
                      <h3>
                        The RTP (Return to player) is 94%. Please see below the
                        multipliers:
                      </h3>
                      <div className={styles["grid"]}>
                        <div className={styles["column"]}>
                          <Image src={BAYC_IMG} alt="BAYC" />
                          <Image src={BAYC_IMG} alt="BAYC" />
                          <Image src={BAYC_IMG} alt="BAYC" />
                          <p>- x30 reward</p>
                        </div>
                        <div className={styles["column"]}>
                          <Image src={Doodles_IMG} alt="Doodles" />
                          <Image src={Doodles_IMG} alt="Doodles" />
                          <Image src={Doodles_IMG} alt="Doodles" />
                          <p>- x12 reward</p>
                        </div>
                        <div className={styles["column"]}>
                          <Image src={PUNK_IMG} alt="PUNK" />
                          <Image src={PUNK_IMG} alt="PUNK" />
                          <Image src={PUNK_IMG} alt="PUNK" />
                          <p>- x20 reward</p>
                        </div>
                        <div className={styles["column"]}>
                          <Image src={Moonbirds_IMG} alt="Moonbirds" />
                          <Image src={Moonbirds_IMG} alt="Moonbirds" />
                          <Image src={Moonbirds_IMG} alt="Moonbirds" />
                          <p>- x10 reward</p>
                        </div>
                        <div className={styles["column"]}>
                          <Image src={MAYC_IMG} alt="MAYC" />
                          <Image src={MAYC_IMG} alt="MAYC" />
                          <Image src={MAYC_IMG} alt="MAYC" />
                          <p>- x15 reward</p>
                        </div>
                        <div className={styles["column"]}>
                          <Image src={CBD_IMG} alt="CBD" />
                          <Image src={CBD_IMG} alt="CBD" />
                          <Image src={CBD_IMG} alt="CBD" />
                          <p>- x5 reward</p>
                        </div>
                      </div>
                      <p>* Any two equal numbers - x1 reward</p>
                    </div>
                  </div>
                  <div>
                    <h3>Incentives</h3>
                    <p>
                      In order to incentivise the first players, on every spin 5
                      $CBET tokens will be credited to players, no matter if
                      they have a winning or losing bet. The total amount of
                      $CBET tokens which will be distributed as incentives is 5%
                      of the total supply (across all Coinbet games).
                    </p>
                  </div>
                  <div>
                    <h3>Is it safe?</h3>
                    <p>
                      Coinbet Slots are perfectly safe to play. Our smart
                      contracts have been thoroughly tested and audited by
                      high-ranking private auditors and randomness is guaranteed
                      by Chainlink’s VRF. Moreover, no deposits are required -
                      you play and receive your winnings directly through your
                      wallet. We have multiple security checks to ensure that
                      when you place a bet, your reward will be fully paid. If
                      there is insufficient liquidity for rewards, the spin
                      won’t be executed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUse;
