import React, { useEffect, useState, Dispatch } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "assets/logo.svg";
import walletlight from "assets/wallet-light.svg";
import walletdark from "assets/wallet-dark.svg";
import sun from "assets/sun.svg";
import moon from "assets/moon.svg";
// import ethLogo from "assets/ethereum.webp";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { SettingAction } from "state/actions/settingsA";
import { capitalize, shortenAddress } from "components/Helpers";
import ConnectWalletModal from "../ConnectWalletModal";
import WalletStateModal from "../WalletStatusModal";
import { Wallet } from "components/Helpers/Types";
import SwitchNetWorkModal from "../SwitchNetWorkModal";
import { NETWORKS } from "components/constants";
interface Props extends RouteComponentProps<any> {}
interface WalletConnectModal {
  show: boolean;
}
interface WalletInfo {
  show: boolean;
  address: string;
}

const NavBar: React.FC<Props> = (props) => {
  const [currentPage, setCurrentPage] = useState("");
  const { theme } = useTypedSelector((state) => state.settings);
  const { selectedNetworkId } = useTypedSelector(
    (state) => state.connectWallet
  );
  const { themeChange, setActiveTab, walletDisconnect } = useActions();
  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });
  const [walletStatusInfo, setWalletStatusInfo] = useState<WalletInfo>({
    show: false,
    address: "",
  });
  const [switchNetWorkModal, setSwitchNetworkModal] = useState<boolean>(false);

  const dispatch = useDispatch<Dispatch<SettingAction>>();
  const networkInfo = NETWORKS.filter(
    (item) => item.id === selectedNetworkId
  )[0];
  const {
    walletConnected,
    accounts,
    loading,
    handleWalletConnect,
  } = useWalletConnect();
  useEffect(() => {
    setCurrentPage(props.location.pathname);
  }, [props.location.pathname]);

  const handleUpdate = () => {
    themeChange(theme);
  };
  return (
    <>
      <nav className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}>
        <div className="container-fluid">
          <Link className="navbar-brand navbar-brand-custom" to="#">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-top"
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/lend" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/lend"
                  onClick={() => dispatch(setActiveTab("lend"))}
                >
                  Lend
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/redeem" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/redeem"
                  onClick={() => dispatch(setActiveTab("redeem"))}
                >
                  Redeem
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/reward" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/reward"
                  onClick={() => dispatch(setActiveTab("reward"))}
                >
                  Reward
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/airdrop" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/airdrop"
                  onClick={() => dispatch(setActiveTab("airdrop"))}
                >
                  Airdrop
                </Link>
              </li>
            </ul>
          </div>
          <button
            className={`d-flex btn ${
              theme === "dark" && "btn-dark"
            } btn-custom-secondary btn-round-switch`}
            onClick={() => {
              // setSwitchNetworkModal(true)
            }}
          >
            <img
              src={
                require(`../../../../assets/${networkInfo.logo}.png`).default
              }
              alt={networkInfo.label}
            />
            <span>{capitalize(networkInfo.label)}</span>
          </button>
          {(accounts && accounts.length) || walletConnected ? (
            <button
              className={`d-flex btn ${
                theme === "dark" && "btn-dark"
              } btn-custom-secondary`}
              onClick={() =>
                setWalletStatusInfo({
                  show: true,
                  address: shortenAddress(accounts[0]),
                })
              }
            >
              {shortenAddress(accounts[0])}
            </button>
          ) : (
            <button
              className={`d-flex btn ${
                theme === "dark" && "btn-dark"
              } btn-custom-secondary`}
              onClick={() => setWalletModalInfo({ show: true })}
            >
              {!loading ? (
                <span>
                  <img
                    src={theme === "light" ? walletlight : walletdark}
                    width="26"
                    alt="Wallet"
                    className="d-inline-block px-1"
                  />
                  Connect wallet
                </span>
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </button>
          )}
          {walletModalInfo.show && !walletConnected && (
            <ConnectWalletModal
              handleClose={() => setWalletModalInfo({ show: false })}
              handleWalletConnect={(wallet: Wallet) => {
                handleWalletConnect(wallet);
              }}
            />
          )}
          {walletStatusInfo.show && walletConnected && (
            <WalletStateModal
              handleClose={() => {
                setWalletStatusInfo({
                  show: false,
                  address: "",
                });
              }}
              handleDisconnect={() => {
                walletDisconnect();
                setWalletStatusInfo({ ...walletStatusInfo, show: false });
                setWalletModalInfo({ ...walletModalInfo, show: false });
              }}
              address={walletStatusInfo.address}
            />
          )}
          {switchNetWorkModal && (
            <SwitchNetWorkModal onHide={() => setSwitchNetworkModal(false)} />
          )}
          <button
            onClick={() => handleUpdate()}
            className={`d-flex ml-3 btn ${
              theme === "dark" && "btn-dark"
            } btn-custom-secondary btn-theme-icon`}
          >
            {
              <img
                width="20"
                src={theme === "light" ? sun : moon}
                alt="theme"
              />
            }
          </button>
        </div>
      </nav>
    </>
  );
};
export default withRouter(NavBar);
