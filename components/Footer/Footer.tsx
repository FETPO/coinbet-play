import styles from "./Footer.module.scss";
import { useRouter } from "next/router";
import { GasIcon } from "../svgs/GasIcon";
import { ChainLinkIcon } from "../svgs/ChainLinkIcon";
import { PolygonStudiosDarkIcon } from "../svgs/PolygonStudiosDarkIcon";
import { usePolygonScanContext } from "../../context/polygonscan.context";

const Footer = () => {
  const router = useRouter();
  const {polygonScanData} = usePolygonScanContext()
  return (
    <div className={styles["footer-wrapper"]}>
      <div className="container">
        <div className={styles["powered-by"]}>
          Powered by
          <ChainLinkIcon />
          <PolygonStudiosDarkIcon />
        </div>
        <div className={styles["gas-section"]}>
          <div>
            <GasIcon />
            <span>{polygonScanData?.gasPrice} gwei</span>
          </div>
          <div></div>
          <div>{polygonScanData?.latestBlock}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
