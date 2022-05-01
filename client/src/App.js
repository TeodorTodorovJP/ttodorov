import "./App.css";

import AuthContext, { extractUser, getToken } from "./providers/AuthContext";
import { useState, useEffect, useContext } from "react";
// import Signin from './components/Signin/Signin';
// import Header from './components/Header/Header';
// import Homepage from './components/Homepage/Homepage';
// import NotFound from "./components/NotFound/NotFound";
// import AdminsPanel from "./components/Admins/AdminsPanel";
// import ProfilePage from "./components/ProfilePage/ProfilePage";
import GuardedRoute from "./providers/GuardedRoute";
import Register from "./components/Register/Register.js";
import Second from "./components/Second/Second.js";
import Navigation from "./components/Navigation/Navigation";

import { Outlet } from "react-router-dom";
import Invoices from "./components/Invoices/Invoices.js";
import Invoice from "./components/Invoices/Invoice.js";
import Main from "./components/Main/Main.js";

import { themes } from "./common/constants.js";

function App() {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
  });

  const [theme, setTheme] = useState(themes.lightTheme);

  const appThemeToggle = (theme) => {
    setTheme(theme);
  };

  const { isLoggedIn, setLoginState } = useContext(AuthContext);
  return (
    <div className={"App " + theme}>
      <div className="navigation">
        <Navigation appThemeToggle={appThemeToggle} />
      </div>
      <div className="web-body">
        <Outlet />
      </div>
    </div>
  );
}
export default App;
// style={{
//   backgroundImage: `url(${process.env.PUBLIC_URL + "/background.jpg"})`,
// }}


