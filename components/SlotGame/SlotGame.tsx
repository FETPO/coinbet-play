import classes from "./SlotGame.module.scss";
import Head from "next/head";

const SlotGame = () => {
  return (
    <>
      <Head>
        <title>Coinbet Play - Slot Game</title>
        <meta name="description" content="Slot Game description" />
      </Head>
      <div className={classes["slot-game-wrapper"]}>
        <div className="container">SlotGame</div>
      </div>
    </>
  );
};

export default SlotGame;
