import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByType,
  filterCreatedPokemons,
  resetFilteredPokemons,
  updateSelectedTypes,
  updateSelectedCreated,
} from "../../redux/actions";
import styles from "./FilterByType.module.css";

const FilterByType = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.types);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const selectedTypes = useSelector((state) => state.selectedTypes);
  const selectedCreated = useSelector((state) => state.selectedCreated);
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

  useEffect(()=>{
    if(selectedCreated) {
      setIsCreatedChecked(true)
    }
  },[selectedCreated])

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
    const {value } = e.target
    setIsCreatedChecked(e.target.checked);
    if (e.target.checked) {
      dispatch(filterCreatedPokemons());
      dispatch(updateSelectedCreated(value))
    } else{
      dispatch(updateSelectedCreated(null))
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
            checked={isCreatedChecked} 
            onChange={handleCreatedChange} 
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
