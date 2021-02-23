import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import logo from "../../../../assets/logo.svg";
import walletlight from "../../../../assets/wallet-light.svg";
import walletdark from "../../../../assets/wallet-dark.svg";
import sun from "../../../../assets/sun.svg";
import moon from "../../../../assets/moon.svg";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
interface Props extends RouteComponentProps<any> {}

const NavBar: React.FC<Props> = (props) => {
  const [currentPage, setCurrentPage] = useState("");
  const { theme } = useTypedSelector((state) => state.settings);
  const { themeChange } = useActions();
  // useEffect(() => {
  //   setCurrentPage(props.location.pathname);
  // }, [props.location.pathname]);

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
              {/* <li className="nav-item">
                <Link
                  className={
                    currentPage === "/swap" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/swap"
                >
                  Swap
                </Link>
              </li> */}
              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/borrow" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/borrow"
                >
                  Borrow
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/lend" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/lend"
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
                >
                  Redeem
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/repay" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/repay"
                >
                  Repay
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className={
                    currentPage === "/migrate" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/migrate"
                >
                  Migrate
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className={
                    currentPage === "/mining" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/mining"
                >
                  Mining
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    currentPage === "/info" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/info"
                >
                  Info
                </Link>
              </li> */}
            </ul>
          </div>
          <button
            className={`d-flex btn ${
              theme === "dark" && "btn-dark"
            } btn-custom-secondary`}
          >
            <span>
              <img
                src={theme === "light" ? walletlight : walletdark}
                width="26"
                alt="Wallet"
                className="d-inline-block px-1"
              />
              Connect wallet
            </span>
          </button>
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
