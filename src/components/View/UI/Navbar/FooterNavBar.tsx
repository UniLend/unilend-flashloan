import React, { Dispatch, SetStateAction } from "react";
import { useActions } from "hooks/useActions";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useTypedSelector } from "hooks/useTypedSelector";
import {
  ThemeButton,
  AccountBalance,
  ActiveNetwork,
  NetworkInfoTab,
  ConnectWalletButton,
  AddressTab,
} from "./Common";
import useWalletConnect from "hooks/useWalletConnect";
import { NETWORKS } from "components/constants";
import { shortenAddress } from "components/Helpers";
import { WalletInfoProps } from "../../../Helpers/Types";

interface Props extends RouteComponentProps<any> {
  setWalletModalInfo: Dispatch<SetStateAction<boolean>>;
  setWalletStatusInfo: Dispatch<SetStateAction<WalletInfoProps>>;
  setSwitchNetworkModal: Dispatch<SetStateAction<boolean>>;
}

const FooterNavBar: React.FC<Props> = (props) => {
  const {
    setWalletModalInfo,
    setWalletStatusInfo,
    setSwitchNetworkModal,
  } = props;

  const { theme } = useTypedSelector((state) => state.settings);
  const { selectedNetworkId, activeNetWork } = useTypedSelector(
    (state) => state.connectWallet
  );
  const networkInfo = NETWORKS.filter(
    (item) => item.id === selectedNetworkId
  )[0];
  const { themeChange } = useActions();

  const handleUpdate = () => {
    themeChange(theme);
  };

  const {
    walletConnected,
    accounts,
    loading,
    accountBalance,
  } = useWalletConnect();

  return (
    <nav
      className={`navbar navbar-expand-sm navbar-${theme} bg-${theme} footer-nav-bar`}
    >
      <div className="app-wallet-details-footer">
        {walletConnected && !loading ? (
          <ActiveNetwork
            theme={theme}
            activeNetWork={activeNetWork}
            className="active-network-footer"
          />
        ) : (
          ""
        )}
        <NetworkInfoTab
          theme={theme}
          logo={networkInfo.logo}
          label={networkInfo.label}
          onClick={() => setSwitchNetworkModal(true)}
          className="network-info-footer"
        />
        {walletConnected && accounts.length && accountBalance ? (
          <AccountBalance
            theme={theme}
            accountBalance={accountBalance}
            className="acc-balance-footer"
          />
        ) : (
          ""
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
          <ConnectWalletButton
            theme={theme}
            onClick={() => setWalletModalInfo(true)}
            loading={loading}
          />
        )}
      </div>
      <div className="app-settings-group">
        <ThemeButton
          onClick={handleUpdate}
          theme={theme}
          dflex={true}
          className="btn-theme-icon-footer"
        />
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
