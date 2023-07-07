import { useSelector } from "react-redux";
import Card from "../Card/Card";

const RenderPokemons = () => {
  const currentPokemon = useSelector((state) => state.currentPokemon);
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const displayedPokemons = (currentPokemon.length > 0)
    ? currentPokemon
    : filteredPokemons.length > 0
    ? filteredPokemons
    : pokemons;

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