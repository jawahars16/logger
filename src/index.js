import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureStore from "../src/store";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import * as actions from "./actions";
const { ipcRenderer } = window.require("electron");

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

ipcRenderer.on("open-file", function(event, file) {
  store.dispatch(actions.openFile(file));
});
