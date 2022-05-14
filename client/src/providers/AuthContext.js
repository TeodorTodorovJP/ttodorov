import { createContext } from "react";
import jwtDecode from "jwt-decode";

export const getToken = () => localStorage.getItem("token") || "";

export const extractUser = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setLoginState: () => {},
});

export default AuthContext;
