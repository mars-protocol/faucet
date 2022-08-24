import CosmosWalletConnectProvider from '../components/WalletConnectProvider'
import '../i18n'
import '../styles/index.scss'
import Index from './index'
import { Suspense } from 'react'

const App = () => {
    return (
        <Suspense fallback={null}>
            <CosmosWalletConnectProvider>
                <Index />
            </CosmosWalletConnectProvider>
        </Suspense>
    )
}

export default App
