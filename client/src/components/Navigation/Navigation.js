import "./Navigation.css";
import { Link, Outlet, Route, Navigate } from "react-router-dom";
import AuthContext, {
  extractUser,
  getToken,
} from "../../providers/AuthContext.js";
import { useState, useEffect, useContext } from "react";

import { ReactComponent as ThemeButton } from "../../Images/SVG/themeLightDark.svg";
import { ReactComponent as Sun } from "../../Images/SVG/sun.svg";
import { ReactComponent as Moon } from "../../Images/SVG/moon.svg";
import { ReactComponent as Sunset } from "../../Images/SVG/sunset.svg";
import { themes } from "../../common/constants.js";

function Navigation({ appThemeToggle }) {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
  });

  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  const [navMenu, setNavMenu] = useState(true);
  const [themeMenu, setThemeMenu] = useState(false);

  const toggleMenu = () => {
    setNavMenu(!navMenu);
  };

  const toggleThemeMenu = () => {
    setThemeMenu(!themeMenu);
  };

  const toggleTheme = (theme) => {
    appThemeToggle(theme);
  };

  return (
    <div className="Navigation">
      <button onClick={() => toggleMenu()}>open</button>
      {navMenu ? (
        <nav>
          <button className="theme-btn" onClick={() => toggleThemeMenu()}>
            <ThemeButton />
          </button>
          {themeMenu ? (
            <div>
              <button onClick={() => toggleTheme(themes.lightTheme)}>
                <Sun />
              </button>
              <button onClick={() => toggleTheme(themes.darkTheme)}>
                <Moon />
              </button>
              <button onClick={() => toggleTheme(themes.eyeTheme)}>
                <Sunset />
              </button>
            </div>
          ) : null}
          <Link to="/register">Register</Link>
          <Link to="/invoices">invoices</Link>
        </nav>
      ) : null}
    </div>
  );
}

export default Navigation;
