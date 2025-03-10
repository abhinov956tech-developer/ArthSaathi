import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedin } = useContext(AppContext);
  return isLoggedin ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
