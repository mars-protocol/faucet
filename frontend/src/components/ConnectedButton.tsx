import { formatValue, lookup } from '../libs/parse'
import { truncate } from '../libs/text'
import colors from '../styles/_assets.module.scss'
import Button from './Button'
import CircularProgress from './CircularProgress'
import styles from './ConnectButton.module.scss'
import { CheckSVG, CopySVG, ExternalSVG, MarsSVG, WalletSVG } from './Svg'
import {
  ChainInfoID,
  fetchBalances,
  SimpleChainInfoList,
  useWallet,
  useWalletManager,
} from '@marsprotocol/wallet-connector'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useClipboard from 'react-use-clipboard'

const ConnectedButton = () => {
  // ---------------
  // EXTERNAL HOOKS
  // ---------------
  const { disconnect } = useWalletManager()
  const { recentWallet } = useWallet()
  const chainId = recentWallet?.network.chainId ?? ''
  const address = recentWallet?.account.address ?? ''
  const [userBalance, setUserBalance] = useState<string | undefined>()
  const { t } = useTranslation()
  const [isCopied, setCopied] = useClipboard(address, {
    successDuration: 1000 * 5,
  })

  // ---------------
  // VARIABLES
  // ---------------
  const blockExplorerURL = recentWallet && SimpleChainInfoList[chainId as ChainInfoID].explorer
  const blockExplorerName = recentWallet && SimpleChainInfoList[chainId as ChainInfoID].explorerName
  const [showDetails, setShowDetails] = useState(false)

  const viewOnFinder = useCallback(() => {
    window.open(`${blockExplorerURL}account/${address}`, '_blank')
  }, [blockExplorerURL, address])

  const onClickAway = useCallback(() => {
    setShowDetails(false)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const userBalances = await fetchBalances(address, chainId)

      if (userBalances && userBalances.balances?.length) {
        setUserBalance(userBalances.balances[0].amount)
      } else {
        if (!userBalance) {
          setUserBalance('0')
        }
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [address, chainId, userBalance])

  return (
    <div className={styles.wrapper}>
      {chainId !== ChainInfoID.Mars1 && <span className={styles.network}>{chainId}</span>}
      <button
        className={styles.button}
        onClick={() => {
          setShowDetails(!showDetails)
        }}
      >
        <span className={styles.walletIcon}>
          {chainId === ChainInfoID.Mars1 || chainId === ChainInfoID.MarsAres1 ? (
            <MarsSVG className={styles.osmosisIcon} />
          ) : (
            <WalletSVG className={styles.walletIcon} />
          )}
        </span>
        <span className={styles.address}>{truncate(address, [2, 4])}</span>
        <div className={styles.balance}>
          {userBalance ? (
            `${formatValue(
              lookup(
                Number(userBalance),
                recentWallet?.network.defaultCurrency?.coinDenom || '',
                recentWallet?.network.defaultCurrency?.coinDecimals || 6,
              ),
              2,
              2,
              true,
              false,
              ' MARS',
            )}`
          ) : (
            <CircularProgress size={12} className={styles.circularProgress} />
          )}
        </div>
      </button>
      {showDetails && (
        <>
          <div className={styles.details}>
            <div className={styles.detailsHeader}>
              <div className={styles.detailsBalance}>
                <p>
                  <span className={styles.detailsDenom}>
                    {recentWallet?.network.defaultCurrency?.coinDenom}
                  </span>
                  {formatValue(
                    lookup(
                      Number(userBalance),
                      recentWallet?.network.defaultCurrency?.coinDenom || '',
                      recentWallet?.network.defaultCurrency?.coinDecimals || 6,
                    ),
                    2,
                    2,
                    true,
                    false,
                    false,
                  )}
                </p>
              </div>
              <div className={styles.detailsButton}>
                <Button text={t('common.disconnect')} color='secondary' onClick={disconnect} />
              </div>
            </div>
            <div className={styles.detailsBody}>
              <p className={styles.addressLabel}>{t('common.yourAddress')}</p>
              <p className={styles.address}>{address}</p>
              <p className={styles.addressMobile}>{truncate(address, [14, 14])}</p>
              <div className={styles.buttons}>
                <button className={styles.copy} onClick={setCopied}>
                  <CopySVG color={colors.secondaryDark} />
                  {isCopied ? (
                    <>
                      {t('common.copied')} <CheckSVG color={colors.secondaryDark} />
                    </>
                  ) : (
                    <>{t('common.copy')}</>
                  )}
                </button>
                <button className={styles.external} onClick={viewOnFinder}>
                  <ExternalSVG color={colors.secondaryDark} />{' '}
                  {t('common.viewOnExplorer', {
                    explorer: blockExplorerName,
                  })}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.clickAway} role='button' onClick={onClickAway} />
        </>
      )}
    </div>
  )
}

export default ConnectedButton
