import { useEffect } from "react";
import { Navigate } from "react-router";
import { LoggedOutAuthState } from "../../contexts/AuthContext.tsx";
import { RoutePaths } from "../../data/DataRoutes.ts";
import useAuth from "../../hooks/useAuth.tsx";

export default function Logout() {
  const { setAuth } = useAuth();
  useEffect(() => {
    setAuth(LoggedOutAuthState);
  }, []);
  return <Navigate to={RoutePaths.ROOT} />;
}
