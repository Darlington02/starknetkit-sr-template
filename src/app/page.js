"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";

function Home() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

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
  }, []);

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
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.logoContainer}>
          <img
            src="https://starknetkit-website-f0ejy1m72-argentlabs.vercel.app/starknetKit-logo-white.svg"
            alt="starknetkit logo"
          />
          <span>Starknetkit</span>
        </div>
        {isConnected ? (
          <button className={styles.connectbtn} onDoubleClick={disconnect}>
            {address.slice(0, 5)}...{address.slice(60, 66)}
          </button>
        ) : (
          <button onClick={toggleModal} className={styles.connectbtn}>
            Connect
          </button>
        )}
        {isModalOpen && (
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
                {connectors.map((connector) => (
                  <div key={connector.id} className={styles.connectorbtnlist}>
                    <button
                      className={styles.connectlinkbtn}
                      onClick={() => {
                        connect({ connector });
                        toggleModal();
                      }}
                    >
                      Connect {connector.id}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="https://starknetkit-website-f0ejy1m72-argentlabs.vercel.app/starknetKit-logo-white.svg"
          alt="Starknetkit Logo"
          width={400}
          height={150}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://starknetkit-website-git-blo-1541-argentlabs.vercel.app/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            StarknetKit <span>-&gt;</span>
          </h2>
          <p>
            StarknetKit is built with all kinds of users in mind. Developers,
            crypto experts, mobile users, and complete newbies will find a way
            to quickly connect to your dapp. For you? only one line of code.
          </p>
        </a>

        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Next.js <span>-&gt;</span>
          </h2>
          <p>
            Next.js gives you the best developer experience with all the
            features you need for production: hybrid static & server rendering,
            smart bundling, and more. No config needed.
          </p>
        </a>

        <a
          href="https://apibara.github.io/starknet-react/get-started"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Starknet-react <span>-&gt;</span>
          </h2>
          <p>
            Starknet React is a collection of React hooks for Starknet. It is
            inspired by wagmi, powered by starknet.js.
          </p>
        </a>

        <a
          href="#"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            About <span>-&gt;</span>
          </h2>
          <p>
            This Starknet Starter Kit was built to provide all you need to take
            your Starknet dapp from development to production in no time!
          </p>
        </a>
      </div>
    </main>
  );
}

export default Home;
