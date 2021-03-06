import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import { injectGlobal } from "styled-components";

export default () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Parisienne');
 body {
    padding: 0;
    margin: 0;
    font-family: "Noto Sans", sans-serif;
  }
  a {
    text-decoration: none;
    color: #111;
  }
`;
