import { Outlet } from "react-router";
import Icon from "../../components/Icon/Icon.tsx";
import useAuth from "../../hooks/useAuth.tsx";
import styles from "./Layout.module.scss";

export default function Layout() {
  const { auth } = useAuth();
  return (
    <div className={styles.contentWrapper}>
      {auth?.email ? (
        // <NavBar />
        <main className={styles.mainSignedIn}>
          <Outlet />
        </main>
      ) : (
        <main className={styles.mainSignedOff}>
          <Icon src={"/icons/gibberish.svg"} className={styles.iconBig} />
          <Icon src={"/icons/gibberish.svg"} className={styles.iconSmall} />
          <Outlet />
        </main>
      )}
    </div>
  );
}
