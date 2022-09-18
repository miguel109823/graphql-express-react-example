import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import api from "services/api";
import rootReducer from "./rootReducer";

const middlewares = [thunk, api.middleware];
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
const enhancers = [];

if (devToolsExtension) {
  enhancers.push(devToolsExtension());
}

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), ...enhancers)
);

export default store;
