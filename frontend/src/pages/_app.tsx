import CosmosWalletConnectProvider from '../components/WalletConnectProvider'
import '../i18n'
import '../styles/index.scss'
import Index from './index'
import Head from 'next/head'
import { Suspense } from 'react'

const App = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1,shrink-to-fit=no' />
        <title>Mars Hub Testnet Faucet</title>
      </Head>
      <Suspense fallback={null}>
        <CosmosWalletConnectProvider>
          <Index />
        </CosmosWalletConnectProvider>
      </Suspense>
    </>
  )
}

export default App
