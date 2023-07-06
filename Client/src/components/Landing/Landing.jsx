import React from 'react'
import "./Landing.module.css"
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <div className='landingContent'>
      <h1>landing</h1>
      <Link to={"/home"}>
      <button>Ingresar</button>
      </Link>
    </div>
    
  )
}

export default Landing