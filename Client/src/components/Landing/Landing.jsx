import styles from "./Landing.module.css"
import { Link } from 'react-router-dom';
import logo from "../../assets/Poke-logo.svg";



const Landing = () => {


  return (
    <div className={styles.crt}>
    <div className={styles.landingContent}>
      <Link to={"/home"}>
      <img src={logo} alt="poke-logo" className={styles.logo}/>
      </Link>
      <div className={styles.landingBackground}>
      <p className={styles.landingParagraph}>Bienvenidos a mi Pokedex Retrowave, el servicio gratuito de backend y las consignas del projecto hacen que la carga de pokemones demoren entre unos 30 y 40 segundos. Por favor espera al menos 1 minuto para interactuar con la pagina. Gracias y disculpa y las molestias.</p>

      </div>
      
    </div>

    </div>
    
  )
}

export default Landing