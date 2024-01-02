import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppPublic from "./AppPublic";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

//html lang
document.documentElement.lang = "it";
const local = process.env.REACT_APP_REDIRECT_URL;
const audience = process.env.REACT_APP_API_ENDPOINT;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientid = process.env.REACT_APP_AUTH0_CLIENT_ID;
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Auth0Provider
        domain={domain}
        clientId={clientid}
        redirectUri={local}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        audience={audience}
      >
        <BrowserRouter>
          <App />
          <AppPublic />
        </BrowserRouter>
      </Auth0Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
