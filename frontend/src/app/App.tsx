import { Route, Routes } from "react-router";
import { RoutePaths } from "../data/DataRoutes.ts";
import AuthPage from "./auth/AuthPage.tsx";
import { AuthActionEnum } from "./auth/utils.ts";
import Logout from "./flowManagers/Logout.tsx";
import NotFound from "./flowManagers/NotFound.tsx";
import RequireLoggedIn from "./flowManagers/RequireLoggedIn.tsx";
import RequireLoggedOut from "./flowManagers/RequireLoggedOut.tsx";
import Layout from "./layouts/Layout.tsx";
import RandomJoke from "./RandomJoke/RandomJoke.tsx";

export default function App(): JSX.Element {
  const authRoutes = [
    { path: RoutePaths.LOGIN, authAction: AuthActionEnum.LOGIN },
    { path: RoutePaths.REGISTRATION, authAction: AuthActionEnum.REGISTER },
  ];

  const protectedRoutes = [
    { path: RoutePaths.LOGOUT, element: <Logout /> },
    { path: RoutePaths.RANDOM_JOKE, element: <RandomJoke /> },
    // { path: RoutePaths.ADD_JOKE, element: <RandomJoke /> },
    // { path: RoutePaths.SAVED_JOKES, element: <RandomJoke /> },
  ];
  return (
    <Routes>
      <Route path={RoutePaths.ROOT} element={<Layout />}>
        <Route element={<RequireLoggedOut />}>
          {authRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<AuthPage authAction={route.authAction} />}
            />
          ))}
        </Route>
        <Route element={<RequireLoggedIn />}>
          <Route element={<RandomJoke />} index />
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
