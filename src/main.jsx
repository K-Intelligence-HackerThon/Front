import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Store from "./store/Store.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Provider Store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
