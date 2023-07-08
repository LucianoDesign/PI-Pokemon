import { useSelector} from "react-redux";

import Card from "../Card/Card";

const RenderPokemons = () => {
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const pokemons = useSelector((state) => state.pokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const displayedPokemons = (pokemonByName.length > 0)
    ? pokemonByName
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