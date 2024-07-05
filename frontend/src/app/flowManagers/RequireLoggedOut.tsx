import { Navigate, Outlet } from "react-router";
import { RoutePaths } from "../../data/DataRoutes.ts";
import useAuth from "../../hooks/useAuth";

export default function RequireLoggedOut() {
  const { auth } = useAuth();
  return auth?.email ? <Navigate to={RoutePaths.ROOT} replace /> : <Outlet />;
}
