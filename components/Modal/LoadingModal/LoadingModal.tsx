import React from "react";
import Loader from "../../Loader/Loader";
import styles from "./LoadingModal.module.scss";

interface ILoadingModalProps {
  onClose?: () => void;
}

const LoadingModal = ({ onClose }: ILoadingModalProps) => {
  return (
    <div className={styles["loading-popup-content"]}>
      <Loader />
      <h1>Your transaction is being processed...</h1>
      <p>
        It may take up to a few minutes, depending on the gas fee you chose.
      </p>
    </div>
  );
};

export default LoadingModal;
