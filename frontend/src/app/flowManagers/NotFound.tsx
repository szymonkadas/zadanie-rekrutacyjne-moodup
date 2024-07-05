import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../data/DataRoutes.ts";

export default function NotFound(): JSX.Element {
  console.log(":D");
  return <Navigate to={`${RoutePaths.ROOT}`} replace />;
}
