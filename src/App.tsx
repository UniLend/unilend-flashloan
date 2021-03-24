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
declare const window: any;
// interface ProviderMessage {
//   type: string;
//   data: unknown;
// }
function App() {
  const [loading, setLoading] = useState<Boolean>(false);
  const { theme, activeTab } = useTypedSelector((state) => state.settings);
  const { handleWalletConnect } = useWalletConnect();

  useEffect(() => {
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
        <Layout>
          <div className={`app-bg`}>
            <div className={`bg-vector ${theme}`}>
              <div
                className="pt-6"
                style={{ height: "100%", overflow: "auto", paddingTop: "60px" }}
              >
                <Switch>
                  <Route
                    key={activeTab}
                    path={`/${activeTab}`}
                    exact
                    render={() => <CommonCard activeTab={activeTab} />}
                  />
                  {/* <Route
                    path="/"
                    exact
                    render={() => <CommonCard activeTab={"deposit"} />}
                  /> */}
                  <Redirect from="*" to="/deposit" />
                </Switch>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default App;
