import styles from "./NavBar.module.css";
import PathRoutes from "../../helpers/Routes.helper";

import { Link, useLocation } from "react-router-dom";


export default function Nav() {

  const location = useLocation();


  return (
    <div className={styles.navContent}>
      
      <div className={styles.navLinks}>
        <Link to={"/home"} className={
            location.pathname === "/home" ? styles.activeLink : ""
          }>Home</Link>
        
        <Link to={PathRoutes.FORM}  className={
            location.pathname === PathRoutes.FORM ? styles.activeLink : ""
          }>Form</Link>

      </div>
    </div>
  );
}
