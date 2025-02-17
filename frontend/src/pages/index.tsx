import Header from '../components/Header'
import Home from '../components/Home'
import Intro from '../components/Intro'
import styles from './index.module.scss'
import { useWalletManager, WalletConnectionStatus } from '@marsprotocol/wallet-connector'
import { useEffect, useState } from 'react'

const Index = () => {
  const { status } = useWalletManager()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (status === WalletConnectionStatus.Connected && !isConnected) {
      setIsConnected(true)
    }
    if (status !== WalletConnectionStatus.Connected && isConnected) {
      setIsConnected(false)
    }
  }, [isConnected, status])

  return (
    <div className={styles.app}>
      <div className={isConnected ? styles.background : `${styles.background} ${styles.night}`} />
      <div className={styles.body}>
        <Header />
        <div className={styles.content}>{isConnected ? <Home /> : <Intro />}</div>
        <div className={styles.copyright}>&copy; 2023 MARS</div>
      </div>
    </div>
  )
}

export default Index
