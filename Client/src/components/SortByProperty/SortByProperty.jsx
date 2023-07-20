import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SortByProperty.module.css";
import { sortPokemons } from "../../redux/actions";
import sword from "../../assets/sword.svg";
import sword2 from "../../assets/sword2.svg";
import shield from "../../assets/shield.svg";
import shield2 from "../../assets/shield2.svg"
import thunder from "../../assets/thunder.svg";
import thunder2 from "../../assets/thunder2.svg"
import heart from "../../assets/heart.svg";
import heart2 from "../../assets/heart2.svg"


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
        { attackButtonActive ? <img src={sword2} alt="attack" className={styles.iconStat}/> : <img src={sword} alt="attack" className={styles.iconStat}/>}
        

      </button>
      <button
        title="Defense"
        className={
          defenseButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleDefenseSort}
      >
        { defenseButtonActive ? <img src={shield2} alt="attack" className={styles.iconStat}/> : <img src={shield} alt="attack" className={styles.iconStat}/>}
        
      </button>
      <button
        title="Speed"
        className={
          speedButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleSpeedSort}
      >
        {speedButtonActive ? <img src={thunder2} alt="attack" className={styles.iconStat}/> : <img src={thunder} alt="attack" className={styles.iconStat}/>}
        
      </button>
      <button
        title="HP"
        className={
          hpButtonActive ? styles.statButtonOn : styles.statButton
        }
        onClick={handleHpSort}
      >
        {hpButtonActive ? <img src={heart2} alt="attack" className={styles.iconStat}/> : <img src={heart} alt="attack" className={styles.iconStat}/>}
         
      </button>
    </div>
  );
};

export default SortByProperty;