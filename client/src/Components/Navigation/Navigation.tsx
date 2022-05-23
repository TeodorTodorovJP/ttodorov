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
import { themes, Themes } from "../../constants/constants";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectState,
  changeTheme,
  toggleMenu,
  toggleThemeMenu,
} from "./navigationSlice";

export default function Navigation() {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
  });

  const { menuState, themeMenuState, theme, themeMenuOpts } =
    useAppSelector(selectState);

  const dispatch = useAppDispatch();

  return (
    <div className="Navigation">
      <button
        className="navToggleButton"
        onClick={() => dispatch(toggleMenu())}
      >
        open
      </button>
      {menuState ? (
        <nav className="nav-tag">
          <div className="theme-wrapper">
            <div className="theme-menu">
              <button
                className="theme-btn"
                onClick={() => dispatch(toggleThemeMenu())}
              >
                <SunMoon />
              </button>
              {themeMenuState ? (
                <div className={themeMenuOpts}>
                  <button
                    className="theme-opt"
                    onClick={() => dispatch(changeTheme(themes.lightTheme))}
                  >
                    <Sun />
                  </button>
                  <button
                    className="theme-opt"
                    onClick={() => dispatch(changeTheme(themes.darkTheme))}
                  >
                    <Moon />
                  </button>
                  <button
                    className="theme-opt"
                    onClick={() => dispatch(changeTheme(themes.sunSetTheme))}
                  >
                    <Sunset />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="links">
            <Link to="/register">Register</Link>
            <Link to="/invoices">Invoices</Link>
            <Link to="/storeData">Store Data</Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
