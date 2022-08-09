import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../store/slices/user";

function RequireAuth({ children }) {
  const { user, error } = useSelector(userSelector);

  if (user === null) {
    return <h3>Checking user...</h3>;
  }

  if (error) {
    return <h3>Something went wrong when loading user data</h3>;
  }

  if (user === false) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
