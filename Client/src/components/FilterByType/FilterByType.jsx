import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByType,
  filterCreatedPokemons,
  resetFilteredPokemons,
  updateSelectedTypes,
} from "../../redux/actions";
import styles from "./FilterByType.module.css";

const FilterByType = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.types);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const selectedTypes = useSelector((state) => state.selectedTypes);
  const [isCreatedChecked, setIsCreatedChecked] = useState(false);
  const [shouldResetFiltered, setShouldResetFiltered] = useState(false);
  

  useEffect(() => {
    if (selectedTypes.length > 0) {
      dispatch(filterPokemonsByType(selectedTypes));
    } else {
      if (shouldResetFiltered) {
        dispatch(resetFilteredPokemons());
      }
    }
  }, [dispatch, selectedTypes, shouldResetFiltered]);

  /* useEffect(() => {
    if (!isCreatedChecked) {
      // Aquí reseteas el filtro cuando isCreatedChecked se desmarca
      dispatch(resetFilteredPokemons());
    }
  }, [isCreatedChecked, dispatch]); */

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const updatedSelectedTypes = [...selectedTypes, value];
      dispatch(updateSelectedTypes(updatedSelectedTypes));
    } else {
      const updatedSelectedTypes = selectedTypes.filter(
        (type) => type !== value
      );
      dispatch(updateSelectedTypes(updatedSelectedTypes));
    }
    setShouldResetFiltered(!checked);
  };
  const handleCreatedChange = (e) => {
    setIsCreatedChecked(e.target.checked);
    if (e.target.checked) {
      dispatch(filterCreatedPokemons());
    } else{
      dispatch(resetFilteredPokemons());
    }
  };

  return (
    <div className={styles.crt}>
      <div className={styles.filterContent}>
        <h4>Filter by:</h4>
        <label>
          <input
            className={styles.filterInputs}
            type="checkbox"
            value="created"
            checked={isCreatedChecked} // Use the state here
            onChange={handleCreatedChange} // Call the handler on change
          />
          *created*
        </label>
        <h4>Filter by type:</h4>
        {pokemonTypes.map((type) => (
          <label key={type.name}>
            <input
              className={styles.filterInputs}
              type="checkbox"
              value={type.name}
              checked={selectedTypes.includes(type.name)}
              onChange={handleTypeChange}
              disabled={
                (!selectedTypes.includes(type.name) &&
                  selectedTypes.length >= 2) ||
                pokemonByName.length > 0
              }
            />
            {type.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByType;
