import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeIcon } from "../../svgs/DarkModeIcon";
import { LightModeIcon } from "../../svgs/LightModeIcon";
import styles from "./ThemeChanger.module.scss";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles["theme-changer"]}>
      {theme === "dark" ? (
        <button title="Switch to light mode" onClick={() => setTheme("light")}>
          <LightModeIcon />
        </button>
      ) : (
        <button title="Switch to dark mode" onClick={() => setTheme("dark")}>
          <DarkModeIcon />
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
