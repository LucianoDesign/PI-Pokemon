import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByType,
  resetFilteredPokemons,
} from "../../redux/actions";

const FilterByType = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const pokemonTypes = useSelector((state) => state.types);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedTypes.length > 0) {
      dispatch(filterPokemonsByType(selectedTypes));
    } else {
      dispatch(resetFilteredPokemons());
    }
  }, [selectedTypes]);

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, value]);
    } else {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((type) => type !== value)
      );
    }
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
          />
          {type.name}
        </label>
      ))}
    </div>
  );
};

export default FilterByType;
