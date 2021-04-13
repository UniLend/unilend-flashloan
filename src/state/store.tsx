import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

// composeEnhancers(applyMiddleware(thunk))
//
