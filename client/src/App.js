import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <Provider store={store}>
    <ToastContainer
      position={toast.POSITION.TOP_RIGHT}
      hideProgressBar
      newestOnTop
      pauseOnHover
    />
    <ErrorBoundary>
      <Router>
        <Routes />
      </Router>
    </ErrorBoundary>
  </Provider>
);

export default App;
