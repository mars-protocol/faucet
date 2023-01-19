import Button from './Button'
import styles from './CookieConsent.module.scss'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const CookieConsent = () => {
  const { t } = useTranslation()
  const hasCookie = document.cookie.match(new RegExp('(^| )viewed_cookie_policy=([^;]+)'))
  const [cookieConsent, setCookieConsent] = useState<boolean>(!!hasCookie)
  const createCookie = () => {
    setCookieConsent(true)
    document.cookie = 'viewed_cookie_policy=yes; path=/'
  }

  return cookieConsent ? null : (
    <section className={styles.cookieConsent}>
      <div className={styles.body}>
        <p className={styles.info}>
          <Trans i18nKey='global.cookieConsent'>
            text
            <a
              href='https://docs.marsprotocol.io/mars-protocol/terms-of-service/mars-privacy-policy'
              target='_blank'
              rel='nofollow noreferrer'
              title={t('global.privacyPolicy')}
            >
              Privacy
            </a>
            text
            <a
              href='https://docs.marsprotocol.io/mars-protocol/terms-of-service/mars-cookie-policy'
              target='_blank'
              rel='nofollow noreferrer'
              title={t('global.cookiePolicy')}
            >
              Cookie Policy
            </a>
          </Trans>
        </p>
        <Button onClick={createCookie} text={t('global.understood')} />
      </div>
    </section>
  )
}
