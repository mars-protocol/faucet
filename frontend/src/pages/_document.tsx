import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                <link rel='icon' href='/favicon.svg' />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <link rel='manifest' href='/site.webmanifest' />
                <link
                    rel='mask-icon'
                    href='/safari-pinned-tab.svg'
                    color='#dd5b65'
                />
                <meta name='robots' content='index,follow' />
                <meta name='description' content='Mars Hub Testnet Faucet.' />
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:site' content='@mars_protocol' />
                <meta name='twitter:creator' content='@mars_protocol' />
                <meta
                    name='msapplication-config'
                    content='/browserconfig.xml'
                />
                <meta
                    property='og:url'
                    content='https://faucet.marsprotocol.io'
                />
                <meta property='og:title' content='Mars - Token Migration' />
                <meta
                    property='og:description'
                    content='Mars Hub Testnet Faucet.'
                />
                <meta
                    property='og:image'
                    content='https://marsprotocol.io/banner.png'
                />
                <meta
                    property='og:site_name'
                    content='Mars - Token Migration'
                />
                <meta name='msapplication-TileColor' content='#ffffff' />
                <meta name='theme-color' content='#ffffff' />
                <meta name='terra-webextension' />
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1,shrink-to-fit=no'
                />
                <title>Mars - Testnet Faucet</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
