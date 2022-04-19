import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "./context/ThemeProvider";
import LocalizationProvider from "./context/LocalizationProvider";
import { WaveProvider } from "./context/WaveContext";

ReactDOM.render(
  <LocalizationProvider>
    <ThemeProvider>
      <WaveProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </WaveProvider>
    </ThemeProvider>
  </LocalizationProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
