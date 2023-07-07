import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    loadPokemonName,
    resetCurrentPokemon,
  } from "../../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (!searchQuery || searchQuery.trim() === "") {
          dispatch(resetCurrentPokemon());
        } else {
          dispatch(loadPokemonName(searchQuery));
        }
        setSearchQuery("");
      };
  return (
    <div>
        <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar