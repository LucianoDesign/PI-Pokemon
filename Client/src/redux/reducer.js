import {
  LOAD_POKEMONS,
  CHANGE_PAGE,
  SORT_POKEMONS,
  LOAD_TYPES,
  SET_POKEMON_NAME,
  RESET_CURRENT_POKEMON,
  FILTER_POKEMONS_BY_TYPE,
  RESET_FILTERED_POKEMONS,
} from "./actions";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  currentPage: 1,
  totalPages: 0,
  pokemonsPerPage: 12,
  sortOrder: "",
  types: [],
  currentPokemon: null,
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
    case SET_POKEMON_NAME:
      return {
        ...state,
        currentPokemon: action.payload,
      };
    
    case RESET_CURRENT_POKEMON:
      return {
        ...state,
        currentPokemon: null,
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
      
        const sortByProperty = (property, ascending) => {
          const compareFunction = (a, b) => {
            if (ascending) {
              return a[property] - b[property];
            } else {
              return b[property] - a[property];
            }
          };
      
          sortedPokemons.sort(compareFunction);
          sortedFilteredPokemons.sort(compareFunction);
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
          default:
            break;
        }
      
        return {
          ...state,
          pokemons: sortedPokemons,
          filteredPokemons: sortedFilteredPokemons,
          sortOrder,
        };

    case FILTER_POKEMONS_BY_TYPE:
      const selectedTypes = action.payload;
      
      const filteredPokemons = state.pokemons.filter((pokemon) => {
        return selectedTypes.every(type =>(pokemon.type.includes(type)));
      });
      const TotalSortPages = Math.ceil(filteredPokemons.length / state.pokemonsPerPage)
      
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

    default:
      return state;
  }
};

export default rootReducer;
