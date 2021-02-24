import React, { useState } from "react";
import "./theme.scss";
import "./App.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import LoadingPage from "components/View/UI/LoadingPage/LoadingPage";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "components/Layout/Layout";
import Deposit from "components/View/Deposit";
import Redeem from "components/View/Redeem";
import Airdrop from "components/View/Airdrop";

function App() {
  const [loading, setLoading] = useState<Boolean>(false);
  const { theme } = useTypedSelector((state) => state.settings);
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
                  <Route path="/deposit" exact component={Deposit} />
                  <Route path="/redeem" exact component={Redeem} />
                  <Route path="/airdrop" exact component={Airdrop} />
                  <Redirect from="/" to="/deposit" />
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
