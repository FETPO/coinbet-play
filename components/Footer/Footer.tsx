import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";
import { formatAddress } from "../../utils/format";
import { useRouter } from "next/router";
import { GasIcon } from "../svgs/GasIcon";
import { LogoIcon } from "../svgs/LogoIcon";

const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles["footer-wrapper"]}>
      <div className="container">
        <div className={styles["powered-by"]}>
          Powered by
          <LogoIcon />
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
