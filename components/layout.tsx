import type { FC, ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./layout.module.scss";

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className={styles["layout"]}>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
