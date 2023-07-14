import React from 'react'
import styles from "./Landing.module.css"
import { Link } from 'react-router-dom';
import logo from "../../assets/Poke-logo.svg";



const Landing = () => {


  return (
    <div className={styles.landingContent}>
      
      <Link to={"/home"}>
      <img src={logo} alt="poke-logo" className={styles.logo}/>
      </Link>
      
    </div>
    
  )
}

export default Landing