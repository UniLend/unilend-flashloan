import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./theme.scss";
import "assets/css/bootstrap.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "state";
import { PersistGate } from "redux-persist/integration/react";
import StackdriverErrorReporter from "stackdriver-errors-js";

export const errorHandler = new StackdriverErrorReporter();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
