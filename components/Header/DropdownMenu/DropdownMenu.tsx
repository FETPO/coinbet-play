import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import DropdownMenuModal from "../../Modal/DropdownMenuModal/DropdownMenuModal";
import Modal from "../../Modal/Modal";
import { DarkModeIcon } from "../../svgs/DarkModeIcon";
import { DiscordIcon } from "../../svgs/DiscordIcon";
import { DocumentationIcon } from "../../svgs/DocumentationIcon";
import { LightModeIcon } from "../../svgs/LightModeIcon";
import { TwitterIcon } from "../../svgs/TwitterIcon";
import { WebsiteIcon } from "../../svgs/WebsiteIcon";
import styles from "./DropdownMenu.module.scss";

const DropdownMenu = () => {
  const ref = useRef(null);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [showDropdownMenuPopup, setShowDropdownMenuPopup] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useOnClickOutside(ref, () => {
    if (window.screen.width > 576) {
      setShowDropdownMenu(false);
    } else {
      // setShowDropdownMenuPopup(false);
    }
  });

  const handleClick = () => {
    if (window.screen.width > 576) {
      setShowDropdownMenu(!showDropdownMenu);
    } else {
      setShowDropdownMenuPopup(true);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles["dropdown-menu-wrapper"]} ${showDropdownMenu ? styles["open"] : ""
          }`}
        onClick={handleClick}
        ref={ref}
      >
        <span></span>
        <span></span>
        <span></span>
        {showDropdownMenu ? (
          <div className={styles["dropdown-menu"]}>
            <div className={styles["dropdown-menu-item"]}>
              <WebsiteIcon />
              <p>
                <Link href={"https://coinbet.finance"}>
                  <a target={"_blank"}>Website</a>
                </Link>
              </p>
            </div>
            <div className={styles["dropdown-menu-item"]}>
              <DocumentationIcon />
              <p>
                <Link href={"https://docs.coinbet.finance"}>
                  <a target={"_blank"}>Docs</a>
                </Link>
              </p>
            </div>
            <div className={styles["dropdown-menu-item"]}>
              <DiscordIcon />
              <p>
                <Link href={"https://discord.com/invite/buZFPPKKYG"}>
                  <a target={"_blank"}>Discord</a>
                </Link>
              </p>
            </div>
            <div className={styles["dropdown-menu-item"]}>
              <TwitterIcon />
              <p>
                <Link href={"https://twitter.com/CoinbetFi"}>
                  <a target={"_blank"}>Twitter</a>
                </Link>
              </p>
            </div>
            <div
              className={styles["dropdown-menu-item"]}
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {theme === "dark" ? (
                <>
                  <LightModeIcon />
                  <p>Light Theme</p>
                </>
              ) : (
                <>
                  <DarkModeIcon />
                  <p>Dark Theme</p>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <Modal
        open={showDropdownMenuPopup}
        onClose={() => setShowDropdownMenuPopup(false)}
      >
        <DropdownMenuModal onClose={() => setShowDropdownMenuPopup(false)} />
      </Modal>
    </>
  );
};

export default DropdownMenu;
