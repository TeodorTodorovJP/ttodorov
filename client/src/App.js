import "./App.css";
import { Link, Outlet, Route, Navigate } from "react-router-dom";
import AuthContext, { extractUser, getToken } from "./providers/AuthContext";
import { useState } from "react";
// import Signin from './components/Signin/Signin';
// import Header from './components/Header/Header';
// import Homepage from './components/Homepage/Homepage';
// import NotFound from "./components/NotFound/NotFound";
// import AdminsPanel from "./components/Admins/AdminsPanel";
// import ProfilePage from "./components/ProfilePage/ProfilePage";
import GuardedRoute from "./providers/GuardedRoute";
import Register from "./components/Register/Register.js";
import Second from "./components/Second/Second.js";

function App() {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
  });

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/register">Register</Link> |{" "}
        <Link to="/invoices">invoices</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
