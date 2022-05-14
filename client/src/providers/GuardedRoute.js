import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const GuardedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Navigate to="/home" />
      }
    />
  );
};

GuardedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default GuardedRoute;
