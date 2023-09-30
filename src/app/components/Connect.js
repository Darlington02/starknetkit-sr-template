"use client";
import { useEffect } from "react";
import styles from "./connect.module.css";
import { useAccount, useConnectors } from "@starknet-react/core";

function Connect({ isModalOpen, toggleModal }) {
  const { connect, connectors, disconnect } = useConnectors();
  const { address, isConnected, account } = useAccount();
  
  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [toggleModal]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalTopContainer}>
          <h2 className={styles.modalHeading}>Choose a wallet</h2>
          <button
            title="Close modal"
            className={styles.closeBtn}
            onClick={toggleModal}
          >
            <img src="/close.svg" alt="close modal" />
          </button>
        </div>
        <div className={styles.connectbtnContainer}>
          {isConnected ? (
            <button className={styles.connectbtn} onDoubleClick={disconnect}>
              {address.slice(0, 5)}...{address.slice(60, 66)}
            </button>
          ) : (
            connectors.map((connector) => (
              <div key={connector.id} className={styles.connectorbtnlist}>
                <button
                  className={styles.connectbtn}
                  onClick={() => connect(connector)}
                >
                  Connect {connector.id}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Connect;
