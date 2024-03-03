import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import { usePhotos } from "../ContextProvider";
function PageNav() {
  const { setQuery, setLoading } = usePhotos();

  function handleClick() {
    setLoading(true);
    setQuery("");
  }

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink className={styles.item} to="/" onClick={handleClick}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.item} to="/history">
            HISTORY
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
