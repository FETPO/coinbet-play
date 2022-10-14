import styles from "./Footer.module.scss";
import { useRouter } from "next/router";
import { GasIcon } from "../svgs/GasIcon";
import { ChainLinkIcon } from "../svgs/ChainLinkIcon";

const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles["footer-wrapper"]}>
      <div className="container">
        <div className={styles["powered-by"]}>
          Powered by
          <ChainLinkIcon />
        </div>
        <div className={styles["gas-section"]}>
          <div>
            <GasIcon />
            <span>19 gwei</span>
          </div>
          <div></div>
          <div>15255403</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
