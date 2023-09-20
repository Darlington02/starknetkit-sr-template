"use client"
import React from 'react'
import styles from "./connect.module.css"
import { useAccount, useConnectors } from '@starknet-react/core';

function Connect() {
  const { connect, connectors, disconnect } = useConnectors();
  const { address, isConnected, account } = useAccount();


  return (
    <div>
      {
        isConnected ?
          <button className={styles.connectbtn} onDoubleClick={disconnect}>{address.slice(0, 5)}...{address.slice(60, 66)}</button>
        :
        connectors.map((connector) => (
            <div>
                <div key={connector.id} className={styles.connectorbtnlist}>
                    <button className={styles.connectbtn} onClick={() => connect(connector)}>
                        Connect {connector.id}
                    </button>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Connect