import {
  LOAD_POKEMONS,
  SORT_POKEMONS,
  CHANGE_PAGE,
  LOAD_TYPES,
  SET_POKEMON_NAME,
  RESET_POKEMON_BY_NAME,
  FILTER_POKEMONS_BY_TYPE,
  RESET_FILTERED_POKEMONS,
  UPDATE_SELECTED_TYPES,
  POST_POKEMON
} from "./actionTypes";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  pokemonByName: [],
  currentPage: 1,
  totalPages: 0,
  pokemonsPerPage: 12,
  sortOrder: "",
  types: [],
  selectedTypes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POKEMONS:
      const pokemons = action.payload;
      const totalPages = Math.ceil(pokemons.length / state.pokemonsPerPage);
      return {
        ...state,
        pokemons: pokemons,
        totalPages,
      };
    case LOAD_TYPES:
      const types = action.payload;
      return {
        ...state,
        types: types,
      };
    case POST_POKEMON:
      const postedPokemon = action.payload;
      console.log(postedPokemon)
      return {
        
        ...state,
        pokemons: [...state.pokemons, postedPokemon]
      }
      
    case SET_POKEMON_NAME:
      const newPokemon = action.payload;

      const isDuplicate = state.pokemonByName.find(
        (pokemon) => pokemon.id === newPokemon.id
      );
      if (isDuplicate) {
        return state;
      } else {
        return {
          ...state,
          pokemonByName: [...state.pokemonByName, newPokemon],
          currentPage: 1,
          pokemonsPerPage: 50
        };
      }

    case RESET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonByName: [],
        pokemonsPerPage: 12
        
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SORT_POKEMONS:
      const { sortOrder } = action.payload;
      let sortedPokemons = [...state.pokemons];
      let sortedFilteredPokemons = [...state.filteredPokemons];
      let sortedpokemonByNames = [...state.pokemonByName];

      const sortByProperty = (property, order) => {
        const compareFunction = (a, b) => {
          if (
            typeof a[property] === "string" &&
            typeof b[property] === "string"
          ) {
            return order
              ? a[property].localeCompare(b[property])
              : b[property].localeCompare(a[property]);
          } else {
            return order
              ? a[property] - b[property]
              : b[property] - a[property];
          }
        };

        sortedPokemons.sort(compareFunction);
        sortedFilteredPokemons.sort(compareFunction);
        sortedpokemonByNames.sort(compareFunction);
      };

      switch (sortOrder) {
        case "asc":
          sortByProperty("name", true);
          break;
        case "desc":
          sortByProperty("name", false);
          break;
        case "asc_id":
          sortByProperty("id", true);
          break;
        case "desc_id":
          sortByProperty("id", false);
          break;
        case "asc_attack":
          sortByProperty("attack", true);
          break;
        case "desc_attack":
          sortByProperty("attack", false);
          break;
        case "asc_defense":
            sortByProperty("defense", true);
          break;
        case "desc_defense":
            sortByProperty("defense", false);
          break;
        case "asc_speed":
          sortByProperty("speed", true);
          break;
        case "desc_speed":
          sortByProperty("speed", false);
          break;
        default:
          break;
      }
      return {
        ...state,
        pokemonByName: sortedpokemonByNames,
        pokemons: sortedPokemons,
        filteredPokemons: sortedFilteredPokemons,
        sortOrder,
      };

    case FILTER_POKEMONS_BY_TYPE:
      const selectedTypes = action.payload;

      const filteredPokemons = state.pokemons.filter((pokemon) => {
        return selectedTypes.every((type) => pokemon.type.includes(type));
      });

      const TotalSortPages = Math.ceil(
        filteredPokemons.length / state.pokemonsPerPage
      );
      return {
        ...state,
        filteredPokemons: filteredPokemons,
        totalPages: TotalSortPages,
        currentPage: 1,
      };

    case RESET_FILTERED_POKEMONS:
      return {
        ...state,
        filteredPokemons: [],
        currentPage: 1,
        totalPages: Math.ceil(state.pokemons.length / state.pokemonsPerPage),
      };
    case UPDATE_SELECTED_TYPES:
      return{
        ...state,
        selectedTypes: action.payload,
      }

    default:
      return state;
  }
};

export default rootReducer;
