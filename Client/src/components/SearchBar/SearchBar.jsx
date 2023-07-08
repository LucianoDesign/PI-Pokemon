import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    loadPokemonName,
    resetpokemonByName,
  } from "../../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (!searchQuery || searchQuery.trim() === "") {
          dispatch(resetpokemonByName());
        } else {
          dispatch(loadPokemonName(searchQuery));
        }
        setSearchQuery("");
      };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          handleSearch();
        }
      };
  return (
    <div>
        <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar