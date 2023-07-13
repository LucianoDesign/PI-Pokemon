import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByType,
  resetFilteredPokemons,
  updateSelectedTypes,
} from "../../redux/actions";
import styles from "./FilterByType.module.css"

const FilterByType = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.types);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const selectedTypes = useSelector((state) => state.selectedTypes);
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
  
  return (
    <div className={styles.filterContent}>
      <h3>Filter by type:</h3>
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
  );
};

export default FilterByType;
