import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    loadPokemonName,
    resetpokemonByName,
  } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import logo from "../../assets/transparency.png"

const SearchBar = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
      setIsActive(!isActive);
    };

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
      <div className={`${styles.searchBox} ${isActive ? styles.active : ''}`}>
      <input className={styles.searchInput} type="text" name="" placeholder="Poke-Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown}/>
      <button className={styles.searchButton} onClick={handleClick}>
        <img src={logo} alt="search-icon" className={styles.logo} onClick={handleSearch}/>
      </button>
    </div>
    </div>
  )
}

export default SearchBar