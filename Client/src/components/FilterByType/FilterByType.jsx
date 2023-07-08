import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByType,
  resetFilteredPokemons,
} from "../../redux/actions";

const FilterByType = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.types);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [shouldResetFiltered, setShouldResetFiltered] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      dispatch(filterPokemonsByType(selectedTypes));
    } else {
      if (shouldResetFiltered) {
        dispatch(resetFilteredPokemons());
      }
    }
  }, [dispatch, selectedTypes, shouldResetFiltered]);

  useEffect(() => {
    if (filteredPokemons.length === 0 && selectedTypes.length > 0) {
      setNoMatch(true);
    } else {
      setNoMatch(false);
    }
  }, [filteredPokemons]);

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes((preSelectedTypes) => [...preSelectedTypes, value]); /* Setting types of pokemons */
    } else {
      setSelectedTypes((preSelectedTypes) =>
        preSelectedTypes.filter((type) => type !== value) /* unsetting types of pokemons */
      );
    }
    setShouldResetFiltered(!checked);
  };

  return (
    <div>
      <h3>Filter by type:</h3>
      {pokemonTypes.map((type) => (
        <label key={type.name}>
          <input
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
      {noMatch && <p>No match for pokemons</p>}
    </div>
  );
};

export default FilterByType;
