import styles from "./Footer.module.scss";
import { useRouter } from "next/router";
import { GasIcon } from "../svgs/GasIcon";
import { ChainLinkIcon } from "../svgs/ChainLinkIcon";
import { PolygonLightLogo } from "../svgs/PolygonLightLogo";
import { PolygonDarkLogo } from "../svgs/PolygonDarkLogo";
import { usePolygonScanContext } from "../../context/polygonscan.context";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Footer = () => {
  const router = useRouter();
  const { polygonScanData } = usePolygonScanContext()
  const { theme, setTheme } = useTheme();
  const [polygonLogo, setPolygonLogo] = useState(<PolygonDarkLogo />);
  useEffect(() => {
    if (theme) {
      if (theme === "dark") {
        setPolygonLogo(<PolygonDarkLogo />)
      } else if (theme === "light") {
        setPolygonLogo(<PolygonLightLogo />)
      }
    }
  }, [theme]);
  return (
    <div className={styles["footer-wrapper"]}>
      <div className="container">
        <div className={styles["powered-by"]}>
          Powered by
          {polygonLogo}
          <ChainLinkIcon />
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
