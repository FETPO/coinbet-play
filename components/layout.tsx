import { Container } from "@chakra-ui/react"
import type { FC, ReactNode } from "react"
import Footer from "./footer"
import Header from "./header"
import styles from "../styles/layout.module.scss"
import { ChakraProvider } from "@chakra-ui/react"
import { Theme } from "../theme"

const Layout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <Theme>
      <div className={styles["layout"]}>
        <Header />
        <Container>{children}</Container>
        <div style={{ flexGrow: 1 }} />
        <Footer />
      </div>
    </Theme>
  )
}

export default Layout
