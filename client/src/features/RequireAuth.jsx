import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Unauthorized from "../pages/Unauthorized";
import Cookies from "universal-cookie";
import { logoutSuccess } from "../store/authSlice";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      dispatch(logoutSuccess());
    }
  }, [token]);

  return token ? (
    allowedRoles?.includes(user.role) ? (
      <Outlet />
    ) : (
      <Unauthorized />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
