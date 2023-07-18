import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SortByProperty.module.css";
import { sortPokemons } from "../../redux/actions";

const SortByProperty = () => {
  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sortOrder);

  const [attackButtonActive, setAttackButtonActive] = useState(false);
  const [defenseButtonActive, setDefenseButtonActive] = useState(false);
  const [speedButtonActive, setSpeedButtonActive] = useState(false);
  const [hpButtonActive, setHpButtonActive] = useState(false);

  const handleSort = (sortOrder) => {
    dispatch(sortPokemons(sortOrder));
  };

  const handleAttackSort = () => {
    const sortOrder = attackButtonActive ? "asc_attack"  : "desc_attack";
    setAttackButtonActive(!attackButtonActive);
    setDefenseButtonActive(false);
    setSpeedButtonActive(false);
    setHpButtonActive(false);
    handleSort(sortOrder);
  };

  const handleDefenseSort = () => {
    const sortOrder = defenseButtonActive ? "asc_defense" : "desc_defense";
    setDefenseButtonActive(!defenseButtonActive);
    setAttackButtonActive(false);
    setSpeedButtonActive(false);
    setHpButtonActive(false);
    handleSort(sortOrder);
  };

  const handleSpeedSort = () => {
    const sortOrder = speedButtonActive ? "asc_speed" : "desc_speed";
    setSpeedButtonActive(!speedButtonActive);
    setAttackButtonActive(false);
    setDefenseButtonActive(false);
    setHpButtonActive(false);
    handleSort(sortOrder);
  }

  const handleHpSort = () => {
    const sortOrder = hpButtonActive ? "asc_hp" : "desc_hp";
    setHpButtonActive(!hpButtonActive);
    setSpeedButtonActive(false);
    setAttackButtonActive(false);
    setDefenseButtonActive(false);
    handleSort(sortOrder);
  }

  return (
    <div className={styles.sortContainer}>
      <button
        className={styles.videoGameButton}
        onClick={() => {
          handleSort(sortState === "asc" ? "desc" : "asc");
          setAttackButtonActive(false);
          setDefenseButtonActive(false);
          setSpeedButtonActive(false);
        }}
      >
        {sortState === "asc" ? "A-Z" : "Z-A"}
      </button>
      <button
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
      </button>
      <button
        title="Attack"
        className={
          attackButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleAttackSort}
      >
        A
      </button>
      <button
        title="Defense"
        className={
          defenseButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleDefenseSort}
      >
        D
      </button>
      <button
        title="Speed"
        className={
          speedButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleSpeedSort}
      >
        S
      </button>
      <button
        title="HP"
        className={
          hpButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleHpSort}
      >
        H
      </button>
    </div>
  );
};

export default SortByProperty;