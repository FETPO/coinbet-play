import classes from "./HowToUse.module.scss";
import Head from "next/head";

const HowToUse = () => {
  return (
    <>
      <Head>
        <title>Coinbet Play - How to use</title>
        <meta name="description" content="How to use description" />
      </Head>
      <div className={classes["how-to-use-wrapper"]}>
        <div className="container">HowToUse</div>
      </div>
    </>
  );
};

export default HowToUse;
