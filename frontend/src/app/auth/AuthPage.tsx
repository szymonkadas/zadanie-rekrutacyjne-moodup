import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "../../data/DataRoutes.ts";
import styles from "./AuthPage.module.scss";
import { AuthActionEnum } from "./utils.ts";

export default function AuthPage({
  authAction,
}: {
  authAction: AuthActionEnum;
}) {
  console.log(":D");
  const { title, subtitleText, linkText, linkTo } =
    getAuthPageValues(authAction);
  const location = useLocation();
  const from = location.state?.from?.pathname || RoutePaths.ROOT;
  return (
    <div className={styles.authWrapper}>
      {authAction}
      <h1>{title}</h1>
      <p>{subtitleText}</p>
      <Link to={linkTo}>{linkText}</Link>
      from {from}
    </div>
  );
}

function getAuthPageValues(authAction: AuthActionEnum) {
  switch (authAction) {
    case AuthActionEnum.LOGIN:
      return {
        title: "Log in",
        subtitleText: "Don't have an account?",
        linkText: "Sign in here.",
        linkTo: RoutePaths.REGISTRATION,
      };
      break;
    default:
      return {
        title: "Register",
        subtitleText: "Already have an account?",
        linkText: "Log in here.",
        linkTo: RoutePaths.LOGIN,
      };
  }
}
