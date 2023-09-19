import React, { useEffect } from "react";
import {
  useLocation,
  Navigate,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import useUserStore from "../app/userStore";

function PrivateRoute() {
  const { isAuth } = useUserStore();
  const location = useLocation();
  const from = location.pathname + location.search;
  return isAuth ? <Outlet /> : <Navigate to="/login" state={from} />;
}

export default PrivateRoute;
