import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "../../Button/Button";
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
        <Button
          variant="secondary"
          size="medium"
          onClick={() => setTheme("light")}
          icon={<LightModeIcon />}
        ></Button>
      ) : (
        <Button
          variant="secondary"
          size="medium"
          onClick={() => setTheme("dark")}
          icon={<DarkModeIcon />}
        ></Button>
      )}
    </div>
  );
};

export default ThemeChanger;
