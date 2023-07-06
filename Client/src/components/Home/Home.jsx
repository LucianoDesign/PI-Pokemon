import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadPokemons,
  changePage,
  sortPokemons,
  loadPokemonTypes,
  loadPokemonName,
  resetCurrentPokemon,
  filterPokemonsByType,
  resetFilteredPokemons
} from "../../redux/actions";
import Card from "../Card/Card";
import styles from "./Home.module.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  console.log(selectedTypes)
  
  const dispatch = useDispatch();
  const currentPokemon = useSelector((state) => state.currentPokemon);
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const pokemonTypes = useSelector((state) => state.types);
  

  useEffect(() => {
    dispatch(loadPokemons());
    dispatch(loadPokemonTypes());
  }, []);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      dispatch(filterPokemonsByType(selectedTypes));
    } else {
      dispatch(resetFilteredPokemons());
    }
  }, [selectedTypes]);

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  const handleSort = (sortOrder) => {
    dispatch(sortPokemons(sortOrder));
  };
  const handleSearch = () => {
    if (!searchQuery || searchQuery.trim() === "") {
      dispatch(resetCurrentPokemon());
    } else {
      dispatch(loadPokemonName(searchQuery));
    }
  };

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

  
 

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.length > 0 ? filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  ) : pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return (
    <div>
      <div className={styles.divHomeContent}>
        {currentPokemon ? (
          <Card
            key={currentPokemon.id}
            id={currentPokemon.id}
            name={currentPokemon.name}
            image={currentPokemon.image}
            type={currentPokemon.type}
          />
        ) : (
          currentPokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.type}
            />
          ))
        )}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={page === currentPage ? styles.active : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button onClick={() => handleSort("asc")}>Ordenar A-Z</button>
      <button onClick={() => handleSort("desc")}>Ordenar Z-A</button>
      <button onClick={() => handleSort("asc_id")}>
        Ordenar por id ascendente
      </button>
      <button onClick={() => handleSort("desc_id")}>
        Ordenar por id descendente
      </button>
      <button onClick={() => handleSort("asc_attack")}>
        Menor Ataque
      </button>
      <button onClick={() => handleSort("desc_attack")}>
        Mayor Ataque
      </button>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
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
    </div>
  );
};

export default Home;
