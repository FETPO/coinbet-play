import classes from "./RewardPool.module.scss";
import Head from "next/head";

const RewardPool = () => {
  return (
    <>
      <Head>
        <title>Coinbet Play - Reward Pool</title>
        <meta name="description" content="Reward Pool description" />
      </Head>
      <div className={classes["reward-pool-wrapper"]}>
        <div className="container">RewardPool</div>
      </div>
    </>
  );
};

export default RewardPool;
