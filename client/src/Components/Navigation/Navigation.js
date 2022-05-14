import "./Navigation.css";
import { Link, Outlet, Route, Navigate } from "react-router-dom";
import AuthContext, {
  extractUser,
  getToken,
} from "../../providers/AuthContext.js";
import { useState, useEffect, useContext } from "react";

import { ReactComponent as SunMoon } from "../../Images/SVG/sun-moon.svg";
import { ReactComponent as Sun } from "../../Images/SVG/sun.svg";
import { ReactComponent as Moon } from "../../Images/SVG/moon.svg";
import { ReactComponent as Sunset } from "../../Images/SVG/sunset.svg";
import { themes } from "../../constants/constants";

function Navigation({ appThemeToggle }) {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
  });

  const { isLoggedIn, setLoginState } = useContext(AuthContext);

  const [navMenu, setNavMenu] = useState(true);
  const [themeMenu, setThemeMenu] = useState(true);
  const [themeMenuOpts, setThemeMenuOpts] = useState("theme-menu-opts-show");

  const toggleMenu = () => {
    setNavMenu(!navMenu);
  };

  const toggleThemeMenu = () => {
    setThemeMenu(!themeMenu);
    // setThemeMenuOpts(
    //   themeMenuOpts === "theme-menu-opts-hide"
    //     ? "theme-menu-opts-show"
    //     : "theme-menu-opts-hide"
    // );
  };

  const toggleTheme = (theme) => {
    appThemeToggle(theme);
  };

  return (
    <div className="Navigation">
      <button onClick={() => toggleMenu()}>open</button>
      {navMenu ? (
        <nav className="nav-tag">
          <div className="theme-wrapper">
            <div className="theme-menu">
              <button className="theme-btn" onClick={() => toggleThemeMenu()}>
                <SunMoon />
              </button>
              {themeMenu ? (
                <div className={themeMenuOpts}>
                  <button
                    className="theme-opt"
                    onClick={() => toggleTheme(themes.lightTheme)}
                  >
                    <Sun />
                  </button>
                  <button
                    className="theme-opt"
                    onClick={() => toggleTheme(themes.darkTheme)}
                  >
                    <Moon />
                  </button>
                  <button
                    className="theme-opt"
                    onClick={() => toggleTheme(themes.eyeTheme)}
                  >
                    <Sunset />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="links">
            <Link to="/register">Register</Link>
            <Link to="/invoices">invoices</Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}

export default Navigation;
