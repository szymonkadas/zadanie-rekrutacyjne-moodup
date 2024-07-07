import { Link } from "react-router-dom";
import { RoutePaths } from "../../data/DataRoutes.ts";
import Icon from "../Icon/Icon.tsx";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <Icon src={"/icons/timberman-alt.svg"} className={styles.navLogo} />
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to={RoutePaths.RANDOM_JOKE} className={styles.navLink}>
              Random joke
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to={RoutePaths.SAVED_JOKES} className={styles.navLink}>
              My jokes
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to={RoutePaths.ADD_JOKE} className={styles.navLink}>
              Add joke
            </Link>
          </li>
        </ul>
      </div>

      <Link
        to={RoutePaths.LOGOUT}
        className={`${styles.navLink} ${styles.navAction}`}
      >
        Log out
      </Link>
      <p className={styles.note}>made with Chuck by Nornik - 2024</p>
    </nav>
  );
}
