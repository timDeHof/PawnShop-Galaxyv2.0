import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import AuthProvider from "./components/AuthProvider";
import "./style/index.css";

// Create Reference to Container
const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

