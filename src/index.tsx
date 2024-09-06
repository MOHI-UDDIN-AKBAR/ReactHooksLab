import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
