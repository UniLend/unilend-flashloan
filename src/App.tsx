import React, { useEffect, useState } from "react";
import "./theme.scss";
import "./App.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import LoadingPage from "components/View/UI/LoadingPage/LoadingPage";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "components/Layout/Layout";
import dotEnv from "dotenv";
// import useWalletConnect from "hooks/useWalletConnect";
import CommonCard from "components/View/CommonCard";
import useWalletConnect from "hooks/useWalletConnect";
import { Alert } from "react-bootstrap";
import AlertImg from "assets/warning.svg";
// import { useActions } from "hooks/useActions";
declare const window: any;
// interface ProviderMessage {
//   type: string;
//   data: unknown;
// }
function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [alertShow, setAlertShow] = useState<Boolean>(true);
  const { theme, activeTab } = useTypedSelector((state) => state.settings);
  // const { tokenGroupList, tokenList } = useTypedSelector(
  //   (state) => state.tokenManage
  // );
  // const { setActiveTab, networkSwitchHandling, fetchTokenList } = useActions();
  const { handleWalletConnect } = useWalletConnect();
  // useEffect(() => {
  //   if (tokenList.payload.length === 0) {
  //     setLoading(true);
  //     fetchTokenList(tokenGroupList, networkId, activeTab);
  //   }
  //   if (tokenList.payload.length !== 0) {
  //     setLoading(false);
  //   }
  // }, [tokenList, activeTab]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dotEnv.config();
    let connectedWallet = localStorage.getItem("walletConnected");
    console.log(connectedWallet);

    if (connectedWallet) {
      handleWalletConnect(JSON.parse(connectedWallet));
    }
    if (window && window.ethereum !== undefined && window !== undefined) {
      // let wallet = localStorage.getItem("wallet");
      // if (wallet) {
      //   handleWalletConnect(JSON.parse(wallet));
      // }
      //   window.ethereum.on("disconnect", () => {});
      //   window.ethereum.on("accountsChanged", (accounts: any) => {
      //     handleWalletConnect();
      //   });

      window.ethereum.on("chainChanged", (chainId: any) => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", function (accounts: string) {
        handleWalletConnect({
          id: 1,
          name: "metamask",
          icon: "",
        });
      });
      window.ethereum.on("message", (message: any) => {
        console.log(message);
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                  UniLend FlashLoan contrfact has been audited by Certik.
                  However, it is still in beta, use it at your own risk.
                  <br />
                  Please familiarize yourself with the platform to understand
                  the correct usage and features of the platform.
                </p>
              </div>
            </Alert>
          )}
          <Layout>
            <div className={`app-bg`}>
              <div className={`bg-vector ${theme}`}>
                <div
                  className="pt-6"
                  style={{
                    height: "100%",
                    overflow: "auto",
                    paddingTop: "60px",
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
            </div>
          </Layout>
        </>
      )}
    </div>
  );
}

export default App;
