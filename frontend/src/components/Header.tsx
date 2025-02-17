import ConnectButton from './ConnectButton'
import ConnectedButton from './ConnectedButton'
import styles from './Header.module.scss'
import { MarsLogo } from './Svg'
import { useWalletManager, WalletConnectionStatus } from '@marsprotocol/wallet-connector'

const Header = () => {
  const { status } = useWalletManager()
  return (
    <div className={styles.header}>
      <div className={styles.empty} />
      <div className={styles.logo}>
        <MarsLogo />
      </div>
      <div className={styles.connect}>
        {status === WalletConnectionStatus.Connected ? <ConnectedButton /> : <ConnectButton />}
      </div>
    </div>
  )
}

export default Header
