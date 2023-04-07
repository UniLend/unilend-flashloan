import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import logo from 'assets/logo.svg'
// import ethLogo from "assets/ethereum.webp";
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import useWalletConnect from 'hooks/useWalletConnect'
import { SettingAction } from 'state/actions/settingsA'
import { NETWORKS } from 'components/constants'
import { WalletInfoProps } from '../../../Helpers/Types'
import { ThemeButton, AccountBalance, ActiveNetwork, NetworkInfoTab, ConnectWalletButton, AddressTab } from './Common'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useNetwork, useProvider } from 'wagmi'
import { ActionType } from 'state/action-types'
import { Action } from 'state/actions/connectWalletA'
import { setSelectedNetworkId } from 'state/action-creators'

interface Props extends RouteComponentProps<any> {
  setWalletModalInfo: Dispatch<SetStateAction<boolean>>
  setWalletStatusInfo: Dispatch<SetStateAction<WalletInfoProps>>
  setSwitchNetworkModal: Dispatch<SetStateAction<boolean>>
}

const NavBar: React.FC<Props> = (props) => {
  const dispatch = useDispatch<Dispatch<SettingAction | Action>>()

  // const { setWalletModalInfo, setWalletStatusInfo, setSwitchNetworkModal } = props
  // const { selectedNetworkId, activeNetWork, networkId, walletConnected, accounts, loading, accountBalance } =
  //   useTypedSelector((state) => state.connectWallet)
  //   const networkInfo = NETWORKS.filter((item) => item.networkID === (networkId || 1))[0]
  //   // const { walletConnected, accounts, loading, accountBalance } =
  //   //   useWalletConnect();

  const [currentPage, setCurrentPage] = useState('')
  const { theme } = useTypedSelector((state) => state.settings)
  const states = useTypedSelector((state) => state)
  const { themeChange, setActiveTab } = useActions()
  // const [walletConnectedLocal, setWalletConnected] = useState(false)

  const { address, isConnected } = useAccount()
  const { data } = useBalance({ address })
  const { chain } = useNetwork()
  // const provider = useProvider()
  // console.log(provider)

  useEffect(() => {
    if (isConnected) {
      dispatch({
        type: ActionType.CONNECT_WALLET_SUCCESS,
        payload: [address],
      })
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: data?.formatted,
        fullAccountBalance: data?.formatted,
      })
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: chain?.name,
        networkId: chain?.id,
      })
      setSelectedNetworkId(chain?.id)
      // dispatch({
      //   type: ActionType.SELECTED_NETWORK_ID,
      //   networkId: chain?.id,
      // })
    } else {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: 'failed to connect',
      })
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: '',
        fullAccountBalance: '',
      })
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: '',
        networkId: '',
      })
    }
  }, [isConnected])

  useEffect(() => {
    console.log('UserAcount', states)
    setCurrentPage(props.location.pathname)
  }, [props.location.pathname])

  const handleUpdate = () => {
    themeChange(theme)
  }
  return (
    <>
      <nav className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}>
        <div className="container-fluid">
          <Link className="navbar-brand navbar-brand-custom" to="#">
            <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-top" />
          </Link>
          <div className=" float-right top-nav-links" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link
                  className={currentPage === '/lend' ? 'nav-link active' : 'nav-link'}
                  aria-current="page"
                  to="/lend"
                  onClick={() => dispatch(setActiveTab('lend'))}
                >
                  Lend
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={currentPage === '/redeem' ? 'nav-link active' : 'nav-link'}
                  aria-current="page"
                  to="/redeem"
                  onClick={() => dispatch(setActiveTab('redeem'))}
                >
                  Redeem
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={currentPage === '/reward' ? 'nav-link active' : 'nav-link'}
                  aria-current="page"
                  to="/reward"
                  onClick={() => dispatch(setActiveTab('reward'))}
                >
                  Reward
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={currentPage === '/airdrop' ? 'nav-link active' : 'nav-link'}
                  aria-current="page"
                  to="/airdrop"
                  onClick={() => dispatch(setActiveTab('airdrop'))}
                >
                  Airdrop
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="collapse navbar-collapse"> */}
          <div className="app-wallet-details">
            {/* {walletConnected && networkId ? (
              <>
                <ActiveNetwork theme={theme} activeNetWork={activeNetWork} className="btn-custom-secondary" />
                <NetworkInfoTab
                  theme={theme}
                  logo={networkInfo.logo}
                  label={networkInfo.label}
                  onClick={() => {
                    setSwitchNetworkModal(true)
                  }}
                />
              </>
            ) : (
              ''
            )}

            {walletConnected && accounts.length && activeNetWork ? (
              <AccountBalance
                theme={theme}
                accountBalance={accountBalance}
                tokenType={networkId}
                className="acc-balance-header"
              />
            ) : (
              ''
            )}
            {(walletConnected || networkId) && accounts[0] ? (
              <AddressTab
                theme={theme}
                onClick={() =>
                  setWalletStatusInfo({
                    show: true,
                    address: accounts[0],
                  })
                }
                address={accounts[0]}
              />
            ) : (
              <ConnectWalletButton theme={theme} onClick={() => setWalletModalInfo(true)} loading={loading} />
            )} */}
            {/* <ConnectWalletButton
              theme={theme}
              onClick={() => setWalletModalInfo(true)}
              loading={loading}
            /> */}

            <ConnectButton />
            <ThemeButton onClick={handleUpdate} theme={theme} dflex={true} className="ml-3 btn-theme-icon-header" />
          </div>
        </div>
      </nav>
    </>
  )
}
export default withRouter(NavBar)
