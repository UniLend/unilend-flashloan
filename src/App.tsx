/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, useEffect, useState } from "react";
import "./theme.scss";
import "./App.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import LoadingPage from "components/View/UI/LoadingPage/LoadingPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Layout from "components/Layout/Layout";
import dotEnv from "dotenv";
// import useWalletConnect from "hooks/useWalletConnect";
import CommonCard from "components/View/CommonCard";
import useWalletConnect from "hooks/useWalletConnect";
import { Alert } from "react-bootstrap";
import AlertImg from "assets/warning.svg";
import BigNumber from "bignumber.js";
import { errorHandler } from "index";
import { useActions } from "hooks/useActions";
import { SettingAction } from "state/actions/settingsA";
import { useDispatch } from "react-redux";
// import { useActions } from "hooks/useActions";
// declare const window: any;
// interface ProviderMessage {
//   type: string;
//   data: unknown;
// }

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

function App() {
  const [loading, setLoading] = useState<Boolean>(true);

  const [alertShow, setAlertShow] = useState<Boolean>(true);
  const history = useHistory();

  const { theme, activeTab } = useTypedSelector((state) => state.settings);
  const { tokenByUrl } = useTypedSelector((state) => state.tokenManage);
  const { handleTokenPersist, handleCustomTokens } = useActions();
  const {
    handleWalletConnect,
    walletProvider,
    selectedNetworkId,
    connectedWallet,
  } = useWalletConnect();
  const { setActiveTab } = useActions();

  const dispatch = useDispatch<Dispatch<SettingAction>>();

  useEffect(() => {
    dispatch(setActiveTab(history.location.pathname.slice(1)));
  }, [history]);

  useEffect(() => {
    if (localStorage.getItem("activeTab")) {
      dispatch(setActiveTab(localStorage.getItem("activeTab")));
    }
    dotEnv.config();
    handleCustomTokens();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    console.log("starting");
    errorHandler.start({
      key: process.env.REACT_APP_GOOLE_CLOUD_LOGGING_API,
      projectId: process.env.REACT_APP_GOOLE_CLOUD_LOGGING_PROJECTID,
    });
  }, []);

  useEffect(() => {
    handleTokenPersist(tokenByUrl, selectedNetworkId);
  }, [tokenByUrl, selectedNetworkId]);

  useEffect(() => {
    if (connectedWallet) {
      handleWalletConnect(JSON.parse(connectedWallet));
    }
  }, [walletProvider, connectedWallet]);

  return (
    <div className={`App ${theme}`}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {alertShow && (
            <Alert onClose={() => setAlertShow(false)} dismissible>
              {/* {/ <Alert.Heading>Oh snap! You got an error!</Alert.Heading> /} */}
              <div className="alertbody d-flex align-items-center">
                <img className="icon" src={AlertImg} alt="alert" />
                <p className="alertext ml-3">
                  UniLend FlashLoan contract has been
                  <a
                    href="https://unilend.finance/docs/unilend_flashloan_audit_report.pdf"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {` audited by Certik`}
                  </a>
                  . However, it is still in beta, use it at your own risk.
                  Please familiarize yourself with the platform to understand
                  the correct usage and features of the platform.
                </p>
              </div>
            </Alert>
          )}
          <Layout>
            <div className={`app-bg ${alertShow ? "height-92" : "height-100"}`}>
              <div className={`bg-vector ${theme}`}>
                <div
                  className="pt-6"
                  style={{
                    height: "100%",
                    overflow: "auto",
                    // paddingTop: "60px",
                  }}
                >
                  <Switch>
                    <Route
                      key={activeTab}
                      path={`/${activeTab}`}
                      exact
                      render={() => <CommonCard activeTab={activeTab} />}
                    />
                    <Redirect from="/" to="/lend" />
                    <Redirect from="**" to="/lend" />
                  </Switch>
                </div>
              </div>
              <div className="version-denote">v 1.0.5</div>
            </div>
          </Layout>
        </>
      )}
    </div>
  );
}

export default App;
