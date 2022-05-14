import "./App.css";
import AuthContext, { extractUser, getToken } from "./providers/AuthContext";
import { useState, useContext } from "react";
// import Signin from './components/Signin/Signin';
// import Header from './components/Header/Header';
// import Homepage from './components/Homepage/Homepage';
// import NotFound from "./components/NotFound/NotFound";
// import AdminsPanel from "./components/Admins/AdminsPanel";
// import ProfilePage from "./components/ProfilePage/ProfilePage";
import Navigation from "./Components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import { themes } from "./constants/constants";

function App() {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
  });

  const [theme, setTheme] = useState(themes.darkTheme);

  const appThemeToggle = (theme: string) => {
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
