import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SortByProperty.module.css";
import { sortPokemons } from "../../redux/actions";

const SortByProperty = () => {
  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sortOrder);
  console.log(sortState);

  const [attackButtonActive, setAttackButtonActive] = useState(false);
  const [defenseButtonActive, setDefenseButtonActive] = useState(false);
  const [speedButtonActive, setSpeedButtonActive] = useState(false);

  const handleSort = (sortOrder) => {
    dispatch(sortPokemons(sortOrder));
  };

  const handleAttackSort = () => {
    const sortOrder = attackButtonActive ? "asc_attack"  : "desc_attack";
    setAttackButtonActive(!attackButtonActive);
    setDefenseButtonActive(false);
    setSpeedButtonActive(false);
    handleSort(sortOrder);
  };

  const handleDefenseSort = () => {
    const sortOrder = defenseButtonActive ? "asc_defense" : "desc_defense";
    setDefenseButtonActive(!defenseButtonActive);
    setAttackButtonActive(false);
    setSpeedButtonActive(false);
    handleSort(sortOrder);
  };

  const handleSpeedSort = () => {
    const sortOrder = speedButtonActive ? "asc_speed" : "desc_speed";
    setSpeedButtonActive(!speedButtonActive);
    setAttackButtonActive(false);
    setDefenseButtonActive(false);
    handleSort(sortOrder);
  }

  return (
    <div className={styles.sortContainer}>
      <span
        className={styles.videoGameButton}
        onClick={() => {
          handleSort(sortState === "asc" ? "desc" : "asc");
          setAttackButtonActive(false);
          setDefenseButtonActive(false);
          setSpeedButtonActive(false);
        }}
      >
        {sortState === "asc" ? "A-Z" : "Z-A"}
      </span>
      <span
        className={styles.videoGameButton}
        onClick={() => {
          handleSort(sortState === "desc_id" ? "asc_id" : "desc_id")
          setAttackButtonActive(false);
          setDefenseButtonActive(false);
          setSpeedButtonActive(false);
        }
        }
      >
        {sortState === "desc_id" ? "Id ↓" : "Id ↑"}
      </span>
      <span
        className={
          attackButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleAttackSort}
      >
        A
      </span>
      <span
        className={
          defenseButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleDefenseSort}
      >
        D
      </span>
      <span
        className={
          speedButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleSpeedSort}
      >
        S
      </span>
    </div>
  );
};

export default SortByProperty;