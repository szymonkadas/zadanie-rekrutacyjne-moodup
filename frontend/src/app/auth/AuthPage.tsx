import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "../../data/DataRoutes.ts";
import styles from "./AuthPage.module.scss";
import { AuthActionEnum } from "./utils.ts";
import Icon from "../../components/Icon/Icon.tsx";

export default function AuthPage({
  authAction,
}: {
  authAction: AuthActionEnum;
}) {
  const { title, changeActionText, linkText, linkTo } =
    getAuthPageValues(authAction);
  const location = useLocation();
  const from = location.state?.from?.pathname || RoutePaths.ROOT;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password, from);
  }
  return (
    <>
      <Icon src={"/icons/timberman.svg"} className={styles.icon}/>
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <h1 className={styles.mainContentTitle}>Explore "Chuck Jokes" with us!</h1>
          <form className={styles.mainContentForm} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.mainContentInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.mainContentInput}
            />
            <button
              type="submit"
              className={styles.mainContentButton}
            >
              {title}
            </button>
          </form>
        </div>
        <p className={styles.changeAuthAction}>{changeActionText} <Link to={linkTo}>{linkText}</Link></p>
      </div>
      <h4 className={styles.note}>"Chuck Norris can login without signing up, on any website."</h4>
    </>
  );
}

function getAuthPageValues(authAction: AuthActionEnum) {
  switch (authAction) {
    case AuthActionEnum.LOGIN:
      return {
        title: "Log in",
        changeActionText: "Don't have an account?",
        linkText: "Sign up here.",
        linkTo: RoutePaths.REGISTRATION,
      };
    default:
      return {
        title: "Register",
        changeActionText: "Already have an account?",
        linkText: "Log in here.",
        linkTo: RoutePaths.LOGIN,
      };
  }
}
