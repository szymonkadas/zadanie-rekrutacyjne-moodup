import { Navigate, Outlet, useLocation } from "react-router";
import { RoutePaths } from "../../data/DataRoutes.ts";
import useAuth from "../../hooks/useAuth";

export default function RequireLoggedIn() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.email ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePaths.LOGIN} state={{ from: location }} replace />
  );
}
