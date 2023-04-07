/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, useEffect, useState } from 'react'
import './theme.scss'
import './App.scss'
import { useTypedSelector } from 'hooks/useTypedSelector'
import LoadingPage from 'components/View/UI/LoadingPage/LoadingPage'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import Layout from 'components/Layout/Layout'
import dotEnv from 'dotenv'
// import useWalletConnect from "hooks/useWalletConnect";
import CommonCard from 'components/View/CommonCard'
import useWalletConnect from 'hooks/useWalletConnect'
import { Alert } from 'react-bootstrap'
import AlertImg from 'assets/warning.svg'
import BigNumber from 'bignumber.js'
import { errorHandler } from 'index'
import { useActions } from 'hooks/useActions'
import { SettingAction } from 'state/actions/settingsA'
import { useDispatch } from 'react-redux';

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {mainnet, polygon, bsc, moonriver} from "wagmi/chains"
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import { handleCustomTokens, handleTokenPersist } from 'state/action-creators'
// moon river, bse
// import { useActions } from "hooks/useActions";
// declare const window: any;
// interface ProviderMessage {
//   type: string;
//   data: unknown;
// }

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function App() {
  const [loading, setLoading] = useState<Boolean>(false)
  const { theme, activeTab } = useTypedSelector((state) => state.settings)

  const { setActiveTab } = useActions()

  const dispatch = useDispatch<Dispatch<SettingAction>>()

  const { chains, provider } = configureChains(
    // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
    [mainnet, polygon, bsc, moonriver],
    [publicProvider()]
  );
  
  const { connectors } = getDefaultWallets({
    appName: "unilend-flashloan",
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });

  // useEffect(() => {
  //   dispatch(setActiveTab(history.location.pathname.slice(1)))
  // }, [history])

  useEffect(() => {
    if (localStorage.getItem('activeTab')) {
      dispatch(setActiveTab(localStorage.getItem('activeTab')))
    }
    dotEnv.config()
    // handleCustomTokens()
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2000)
    // console.log('starting')
    // errorHandler.start({
    //   key: process.env.REACT_APP_GOOLE_CLOUD_LOGGING_API,
    //   projectId: process.env.REACT_APP_GOOLE_CLOUD_LOGGING_PROJECTID,
    // })
  }, [])

  // useEffect(() => {
  //   console.log("tokenByUrl", tokenByUrl);
  //   handleTokenPersist(tokenByUrl, selectedNetworkId)
  // }, [tokenByUrl, selectedNetworkId])

  // useEffect(() => {
  //   if (connectedWallet) {
  //     handleWalletConnect(JSON.parse(connectedWallet))
  //   }
  // }, [walletProvider, connectedWallet])

  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>

      
    <div className={`App ${theme}`}>
          <Layout>
            <div className={`app-bg ${false ? 'height-92' : 'height-100'}`}>
              <div className={`bg-vector ${theme}`}>
                <div
                  className="pt-6"
                  style={{
                    height: '100%',
                    overflow: 'auto',
                    // paddingTop: "60px",
                  }}
                >
                  {/* <CommonCard activeTab={activeTab} /> */}
                  <Switch>
                    <Route
                      key={activeTab}
                      path={`/${activeTab}`}
                      exact
                      render={() => <CommonCard activeTab={activeTab || ''} />}
                    />
                    <Redirect from="/" to="/lend" />
                    <Redirect from="**" to="/lend" />
                  </Switch>
                </div>
              </div>
              <div className="version-denote">v 1.0.5</div>
            </div>
          </Layout>
    </div>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
