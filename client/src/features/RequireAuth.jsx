import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Unauthorized from "../pages/Unauthorized";

const RequireAuth = ({ allowedRoles }) => {
  const { user, token } = useSelector((store) => store.auth);
  const location = useLocation();

  return allowedRoles?.includes(user.role) ? (
    <Outlet />
  ) : token ? (
    <Unauthorized />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
