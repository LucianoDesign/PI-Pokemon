import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "./SortByProperty.module.css"
import {
    sortPokemons,
  } from "../../redux/actions";

const SortByProperty = () => {
    const dispatch = useDispatch();
    const sortState = useSelector((state)=>state.sortOrder);
    console.log(sortState)

    const handleSort = (sortOrder) => {
        dispatch(sortPokemons(sortOrder));
      };

  return (
    <div className={styles.sortContainer}>
  <span
    className={styles.videoGameButton}
    onClick={() => handleSort(sortState === "asc" ? "desc" : "asc")}
  >
    {sortState === "asc" ? "Ordenar A-Z" : "Ordenar Z-A"}
  </span>
  <span
    className={styles.videoGameButton}
    onClick={() => handleSort(sortState === "asc_id" ? "desc_id" : "asc_id")}
  >
    {sortState === "asc_id" ? "Id ↓" : "Id ↑"}
  </span>
  <span className={styles.statButton} onClick={() => handleSort("asc_attack")}>
    A
  </span>
  <span className={styles.statButton} onClick={() => handleSort("desc_attack")}>
    A
  </span>
</div>
  )
}

export default SortByProperty