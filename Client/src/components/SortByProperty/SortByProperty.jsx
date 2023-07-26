import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SortByProperty.module.css";
import { sortPokemons } from "../../redux/actions";
import {stats} from "./helper"

const SortButton = ({ title, active, onClick, icon, iconActive }) => (
  <button
    title={title}
    className={active ? styles.statButtonOn : styles.statButton}
    onClick={onClick}
  >
    <div className={styles.buttonArrow}>
      {active ? (
        <>
          <img src={iconActive} alt={title} className={styles.iconStat} />
          {"↑"}
        </>
      ) : (
        <>
          <img src={icon} alt={title} className={styles.iconStat} />
          {"↓"}
        </>
      )}
    </div>
  </button>
);

const SortByProperty = () => {
  const dispatch = useDispatch();
  const sortState = useSelector((state) => state.sortOrder);

  const [sortingButtons, setSortingButtons] = useState(stats);

  const handleSort = (sortOrder) => {
    dispatch(sortPokemons(sortOrder));
  };

  const handlePropertySort = (key) => {

    const newButtons = sortingButtons.map((button) => ({
      ...button,
      active: button.key === key ? !button.active : false,
    }));

    setSortingButtons(newButtons);

    const sortOrder = newButtons.find((button) => button.key === key).active
      ? `desc_${key}`
      : `asc_${key}`;

    handleSort(sortOrder);
  };

  return (
    <div className={styles.sortContainer}>
      <button
        className={styles.videoGameButton}
        onClick={() => {
          handleSort(sortState === "asc" ? "desc" : "asc");
          setSortingButtons((prevButtons) =>
            prevButtons.map((button) => ({ ...button, active: false }))
          );
        }}
      >
        {sortState === "asc" ? "A-Z" : "Z-A"}
      </button>
      <button
        className={styles.videoGameButton}
        onClick={() => {
          handleSort(sortState === "desc_id" ? "asc_id" : "desc_id");
          setSortingButtons((prevButtons) =>
            prevButtons.map((button) => ({ ...button, active: false }))
          );
        }}
      >
        {sortState === "desc_id" ? "Id ↓" : "Id ↑"}
      </button>

      {sortingButtons.map((button) => (
        <SortButton
          key={button.key}
          title={button.title}
          active={button.active}
          onClick={() => handlePropertySort(button.key)}
          icon={button.icon}
          iconActive={button.iconActive}
        />
      ))}
    </div>
  );
};

export default SortByProperty;
