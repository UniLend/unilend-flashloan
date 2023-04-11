import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useActions } from 'hooks/useActions';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ThemeButton, AccountBalance, ActiveNetwork, NetworkInfoTab, ConnectWalletButton, AddressTab } from './Common';
import useWalletConnect from 'hooks/useWalletConnect';
import { NETWORKS } from 'components/constants';
import { shortenAddress } from 'components/Helpers';
import { WalletInfoProps } from '../../../Helpers/Types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { ActionType } from 'state/action-types';
import { Action } from 'state/actions/connectWalletA';
import { SettingAction } from 'state/actions/settingsA';
import { useDispatch } from 'react-redux';
import { setSelectedNetworkId } from 'state/action-creators';

interface Props extends RouteComponentProps<any> {
  setWalletModalInfo: Dispatch<SetStateAction<boolean>>;
  setWalletStatusInfo: Dispatch<SetStateAction<WalletInfoProps>>;
  setSwitchNetworkModal: Dispatch<SetStateAction<boolean>>;
}

const FooterNavBar: React.FC<Props> = (props) => {
  const { setWalletModalInfo, setWalletStatusInfo, setSwitchNetworkModal } = props;
  const dispatch = useDispatch<Dispatch<SettingAction | Action>>();

  const { theme } = useTypedSelector((state) => state.settings);
  const { selectedNetworkId, activeNetWork, networkId } = useTypedSelector((state) => state.connectWallet);
  const networkInfo = NETWORKS.filter((item) => item.networkID === (networkId || 1))[0];

  const { themeChange } = useActions();

  const handleUpdate = () => {
    themeChange(theme);
  };

  const { walletConnected, accounts, loading, accountBalance } = useWalletConnect();

  const { address, isConnected } = useAccount();
  const { data } = useBalance({ address });
  const { chain } = useNetwork();

  useEffect(() => {
    if (isConnected) {
      dispatch({
        type: ActionType.CONNECT_WALLET_SUCCESS,
        payload: [address],
      });
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: data?.formatted,
        fullAccountBalance: data?.formatted,
      });
      console.log('NAME', chain?.name);
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: chain?.name,
        networkId: chain?.id,
      });
      setSelectedNetworkId(chain?.id as number);
    } else {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: 'failed to connect',
      });
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: '',
        fullAccountBalance: '',
      });
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: '',
        networkId: '',
      });
    }
  }, [isConnected, chain]);

  return (
    <nav className={`navbar navbar-expand-sm navbar-${theme} bg-${theme} footer-nav-bar`}>
      {/* <div className="app-wallet-details-footer">
        {walletConnected && !loading ? (
          <ActiveNetwork theme={theme} activeNetWork={activeNetWork} className="active-network-footer" />
        ) : (
          ''
        )}
        <NetworkInfoTab
          theme={theme}
          logo={networkInfo.logo}
          label={networkInfo.label}
          onClick={() => {
            setSwitchNetworkModal(true)
          }}
          className="network-info-footer"
        />
        {walletConnected && accounts.length && accountBalance ? (
          <AccountBalance
            theme={theme}
            tokenType={networkId}
            accountBalance={accountBalance}
            className="acc-balance-footer"
          />
        ) : (
          ''
        )}
        {(accounts && accounts.length) || walletConnected ? (
          <AddressTab
            theme={theme}
            onClick={() =>
              setWalletStatusInfo({
                show: true,
                address: shortenAddress(accounts[0]),
              })
            }
            address={accounts[0]}
          />
        ) : (
          <ConnectWalletButton theme={theme} onClick={() => setWalletModalInfo(true)} loading={loading} />
        )}
      </div> */}
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return <ConnectWalletButton theme={theme} onClick={openConnectModal} loading={loading} />;
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  // <div className="app-wallet-details">
                  <div className="app-wallet-details-footer">
                    {walletConnected && !loading ? (
                      <ActiveNetwork theme={theme} activeNetWork={activeNetWork} className="active-network-footer" />
                    ) : (
                      ''
                    )}
                    <NetworkInfoTab
                      theme={theme}
                      logo={networkInfo.logo}
                      label={networkInfo.label}
                      onClick={openChainModal}
                      className="network-info-footer"
                    />

                    <AccountBalance
                      theme={theme}
                      accountBalance={accountBalance}
                      tokenType={networkId}
                      className="acc-balance-footer"
                    />

                    <AddressTab theme={theme} onClick={openAccountModal} address={accounts[0]} />
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      <div className="app-settings-group">
        <ThemeButton onClick={handleUpdate} theme={theme} dflex={true} className="btn-theme-icon-footer" />
        {/* <Button
          className={`d-flex ${
            theme === "dark" && "btn-dark"
          } btn-theme-icon-footer`}
          variant="secondary"
        >
          {
            <i
              className="fa fa-ellipsis-h"
              aria-hidden="true"
              style={{ ...(theme !== "dark" && { color: "black" }) }}
            />
          }
        </Button> */}
      </div>
    </nav>
  );
};

export default withRouter(FooterNavBar);
