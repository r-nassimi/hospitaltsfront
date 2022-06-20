import { createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Store from "src/store/store";
import App from "./App/App";

const store = new Store();

export const Context = createContext({
  store,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </Router>
);