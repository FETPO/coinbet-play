import type { FC, ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./layout.module.scss";
import ConnectWalletModal from "../components/Modal/ConnectWalletModal/ConnectWalletModal";
import Modal from "../components/Modal/Modal";
import { useWalletContext } from "../context/wallet.context";


const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const {
    showWalletModal,
    toggleWalletModal,
    availableWallets,
    setSelectedWallet,
    showInstallWalletModal,
    setShowInstallWalletModal,
  } = useWalletContext();

  return (
    <div className={styles["layout"]}>
      <Header />
      <div>{children}</div>
      <Footer />

      {/* Wallet connect Modal */}
      <Modal
        open={showWalletModal}
        onClose={() => toggleWalletModal(false)}
      >
        <ConnectWalletModal
          onClose={() => toggleWalletModal(false)}
          availableWallets={availableWallets}
          setSelectedWallet={setSelectedWallet}
        />
      </Modal>

      {/* Please install MM modal */}
      <Modal
        open={showInstallWalletModal}
        onClose={() => setShowInstallWalletModal(false)}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '20%',
            transform: 'translate(0%, -4%)'
          }}
        >
          <p>Please Install Metamask !</p>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;
