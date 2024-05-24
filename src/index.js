import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/dropdown";
import PathfindingVisualizer from "./pathfindingVisualizer/pathfindingVisualizer";

ReactDOM.render(
  <React.StrictMode>
    <PathfindingVisualizer />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
