import React from 'react'
import { useDispatch } from "react-redux";
import styles from "./SortByProperty.module.css"
import {
    sortPokemons,
  } from "../../redux/actions";

const SortByProperty = () => {
    const dispatch = useDispatch();

    const handleSort = (sortOrder) => {
        dispatch(sortPokemons(sortOrder));
      };

  return (
    <div>
        <button onClick={() => handleSort("asc")}>Ordenar A-Z</button>
      <button onClick={() => handleSort("desc")}>Ordenar Z-A</button>
      <button onClick={() => handleSort("asc_id")}>
        Ordenar por id ascendente
      </button>
      <button onClick={() => handleSort("desc_id")}>
        Ordenar por id descendente
      </button>
      <button onClick={() => handleSort("asc_attack")}>Menor Ataque</button>
      <button onClick={() => handleSort("desc_attack")}>Mayor Ataque</button>
    </div>
  )
}

export default SortByProperty