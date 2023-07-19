import { useState } from "react";
import styles from "./NavBar.module.css";
import PathRoutes from "../../helpers/Routes.helper";
import ReactPlayer from "react-player/youtube";

import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (location.pathname === "/") {
    return null; // No renderizar el componente NavBar
  }

  return (
    <div className={styles.navContent}>
      <div className={styles.navLinks}>
        <Link
          to={"/home"}
          className={location.pathname === "/home" ? styles.activeLink : ""}
        >
          Home
        </Link>

        <Link
          to={PathRoutes.FORM}
          className={
            location.pathname === PathRoutes.FORM ? styles.activeLink : ""
          }
        >
          Create
        </Link>
        <Link
          to={PathRoutes.LANDING}
          className={
            location.pathname === PathRoutes.LANDING ? styles.activeLink : ""
          }
        >
          Back
        </Link>
      </div>
      <div className={styles.reactPlayer}>
        <ReactPlayer
          url={[
            "https://www.youtube.com/watch?v=fEhPACdfPKk",
            "https://www.youtube.com/watch?v=B3BjdAVkaSw&list=PLbjge-9eSDosn0MO2YG_IsIV8Cm9gIboE&index=8",
            "https://www.youtube.com/watch?v=aZqtq6o0On4&list=PLbjge-9eSDosn0MO2YG_IsIV8Cm9gIboE&index=4",
            "https://www.youtube.com/watch?v=Fj81DQ26dPo&list=PLbjge-9eSDosn0MO2YG_IsIV8Cm9gIboE&index=19",
          ]}
          controls={true}
          playing={isPlaying}
          width={0}
          height={0}
        />

        <button onClick={handleTogglePlay}>
          {isPlaying ? "Pausar" : "Reanudar"} Sonido
        </button>
      </div>
    </div>
  );
}
