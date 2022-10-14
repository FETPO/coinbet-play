import { useTheme } from "next-themes";
import React from "react";
import { DarkModeIcon } from "../../svgs/DarkModeIcon";
import { DiscordIcon } from "../../svgs/DiscordIcon";
import { LightModeIcon } from "../../svgs/LightModeIcon";
import { TwitterIcon } from "../../svgs/TwitterIcon";
import { WebsiteIcon } from "../../svgs/WebsiteIcon";
import styles from "./DropdownMenuModal.module.scss";

interface IDropdownMenuModalProps {
  onClose: () => void;
}

const DropdownMenuModal = ({ onClose }: IDropdownMenuModalProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles["dropdown-menu"]}>
      <div className={styles["dropdown-menu-item"]}>
        <WebsiteIcon />
        <p>Website</p>
      </div>
      <div className={styles["dropdown-menu-item"]}>
        <DiscordIcon />
        <p>Discord</p>
      </div>
      <div className={styles["dropdown-menu-item"]}>
        <TwitterIcon />
        <p>Twitter</p>
      </div>
      <div
        className={styles["dropdown-menu-item"]}
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
          onClose();
        }}
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
  );
};

export default DropdownMenuModal;
