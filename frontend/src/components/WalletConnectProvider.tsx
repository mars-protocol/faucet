import CircularProgress from './CircularProgress'
import styles from './WalletConnectProvider.module.scss'
import { ChainInfoID, WalletID, WalletManagerProvider } from '@marsprotocol/wallet-connector'
import i18next from 'i18next'
import { FC, useState } from 'react'

const enabledWallets = [WalletID.Keplr, WalletID.Cosmostation]

const defaultChainId = ChainInfoID.MarsAres1

const CosmosWalletConnectProvider: FC<WrapperComponent> = ({ children }) => {
  const [i18nInit, setI18nInit] = useState(false)

  i18next.on('initialized', () => {
    setI18nInit(true)
  })

  if (i18nInit) {
    return (
      <WalletManagerProvider
        defaultChainId={defaultChainId}
        enabledWallets={enabledWallets}
        persistent
        renderLoader={() => (
          <div className={styles.loader}>
            <CircularProgress size={30} />
          </div>
        )}
        closeIcon={<div />}
      >
        {children}
      </WalletManagerProvider>
    )
  } else {
    return null
  }
}

export default CosmosWalletConnectProvider
