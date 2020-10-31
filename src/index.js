import React from "react";
import ReactDOM from "react-dom";

import Home from "./Components/Home";
import "antd/dist/antd.less";
import "antd/dist/antd.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  rootElement
);
