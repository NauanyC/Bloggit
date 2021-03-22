import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";
import "./index.css";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("#root")
);
