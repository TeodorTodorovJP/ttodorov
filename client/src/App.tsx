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
import { useAppSelector, useAppDispatch } from "./app/hooks";

import { selectState } from "./Components/Navigation/navigationSlice";

function App() {
  // const [authValue, setAuthValue] = useState({
  //   isLoggedIn: !!extractUser(getToken()),
  //   user: extractUser(getToken()),
  // });
  // const { isLoggedIn, setLoginState } = useContext(AuthContext);

  const { theme } = useAppSelector(selectState);

  return (
    <div className={"App " + theme}>
      <div className="navigation">
        <Navigation />
      </div>
      <div className="web-body">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
