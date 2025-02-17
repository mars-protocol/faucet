import styles from './ConnectButton.module.scss'
import { WalletSVG } from './Svg'
import { useWalletManager } from '@marsprotocol/wallet-connector'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  textOverride?: string | ReactNode
  variant?: string
}

const ConnectButton = ({ textOverride, variant }: Props) => {
  const { connect } = useWalletManager()

  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <button
        className={
          variant
            ? `${styles.button} ${styles.connect} ${variant}`
            : `${styles.button} ${styles.connect}`
        }
        onClick={connect}
      >
        <WalletSVG />
        <span className='overline'>{textOverride || t('common.connectWallet')}</span>
      </button>
    </div>
  )
}

export default ConnectButton
