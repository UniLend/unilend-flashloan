import React, { useEffect, useState, Dispatch } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../../../assets/logo.svg";
import walletlight from "../../../../assets/wallet-light.svg";
import walletdark from "../../../../assets/wallet-dark.svg";
import sun from "../../../../assets/sun.svg";
import moon from "../../../../assets/moon.svg";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { SettingAction } from "state/actions/settingsA";
import { shortenAddress } from "components/Helpers";
interface Props extends RouteComponentProps<any> {}

const NavBar: React.FC<Props> = (props) => {
  const [currentPage, setCurrentPage] = useState("");
  const { theme } = useTypedSelector((state) => state.settings);
  const { themeChange, setActiveTab } = useActions();
  const dispatch = useDispatch<Dispatch<SettingAction>>();
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
  const connectWallet = async () => {
    handleWalletConnect();
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
                    currentPage === "/deposit" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/deposit"
                  onClick={() => dispatch(setActiveTab("deposit"))}
                >
                  Deposit
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
                    currentPage === "/donate" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/donate"
                  onClick={() => dispatch(setActiveTab("donate"))}
                >
                  Donate
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
          {(accounts && accounts.length) || walletConnected ? (
            <button
              className={`d-flex btn ${
                theme === "dark" && "btn-dark"
              } btn-custom-secondary`}
              onClick={connectWallet}
            >
              {shortenAddress(accounts[0])}
            </button>
          ) : (
            <button
              className={`d-flex btn ${
                theme === "dark" && "btn-dark"
              } btn-custom-secondary`}
              onClick={connectWallet}
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
