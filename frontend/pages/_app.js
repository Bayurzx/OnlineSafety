import { MoralisProvider } from 'react-moralis'
import '../styles/globals.css'
import '../styles/Game.css'
import { Web3Provider } from "../context/Web3Context";
import { NotificationProvider } from "web3uikit";


function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>

        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>

      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
