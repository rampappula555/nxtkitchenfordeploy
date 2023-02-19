import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
