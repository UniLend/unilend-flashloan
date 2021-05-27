import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import persistStore from "redux-persist/es/persistStore";
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = createStore(reducers, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);
// composeEnhancers(applyMiddleware(thunk))
//
