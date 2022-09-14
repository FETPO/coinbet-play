import { Container } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import Header from "./Header/Header";
import styles from "./layout.module.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "../theme";

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <Theme>
      <div className={styles["layout"]}>
        <Header />
        <div className={styles["layout-section-wrapper"]}>{children}</div>
      </div>
    </Theme>
  );
};

export default Layout;
