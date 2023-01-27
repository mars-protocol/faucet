import CircularProgress from './CircularProgress'
import styles from './WalletConnectProvider.module.scss'
import { ChainInfoID, WalletID, WalletManagerProvider } from '@marsprotocol/wallet-connector'
import { FC } from 'react'

const enabledWallets = [WalletID.Keplr, WalletID.Cosmostation]

const defaultChainId = ChainInfoID.MarsAres1

const CosmosWalletConnectProvider: FC<WrapperComponent> = ({ children }) => {
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
}

export default CosmosWalletConnectProvider
