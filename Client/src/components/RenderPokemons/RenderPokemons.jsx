import { useSelector} from "react-redux";
import styles from "./RenderPokemons.module.css"

import Card from "../Card/Card";

const RenderPokemons = () => {
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const selectedTypes = useSelector((state) => state.selectedTypes);
  

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const displayedPokemons = (() => {
    if (pokemonByName.length > 0) {
      return pokemonByName;
    } else if (filteredPokemons.length > 0) {
      return filteredPokemons;
    } else if (selectedTypes.length > 0 && filteredPokemons.length === 0) {
      return null; // No hay pokemones filtrados
    } else {
      return pokemons;
    }
  })();

  if (!displayedPokemons) {
    return <h1 className={styles.noMatch}>No match for pokemons</h1>;
  }

  const paginatedPokemons = displayedPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  return paginatedPokemons.map((pokemon) => (
    <Card
      key={pokemon.id}
      id={pokemon.id}
      name={pokemon.name}
      image={pokemon.image}
      type={pokemon.type}
    />
  ));
};

export default RenderPokemons;