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
  currentPokemon: [],
  currentPage: 1,
  totalPages: 0,
  pokemonsPerPage: 12,
  sortOrder: "",
  types: [],
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
      const newPokemon = action.payload;

      const isDuplicate = state.currentPokemon.find(
        (pokemon) => pokemon.id === newPokemon.id
      );
      if (isDuplicate) {
        return state;
      } else {
        
        return {
          ...state,
          currentPokemon: [...state.currentPokemon, newPokemon],
         }  

      };
    
    case RESET_CURRENT_POKEMON:
      return {
        ...state,
        currentPokemon: [],
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
        let sortedCurrentPokemons = [...state.currentPokemon];
        
      
        const sortByProperty = (property, ascending) => {
          const compareFunction = (a, b) => {
  if (typeof a[property] === 'string' && typeof b[property] === 'string') {
    return ascending ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property]);
  } else {
    return ascending ? a[property] - b[property] : b[property] - a[property];
  }
};
      
          sortedPokemons.sort(compareFunction);
          sortedFilteredPokemons.sort(compareFunction);
          sortedCurrentPokemons.sort(compareFunction);
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
          currentPokemon: sortedCurrentPokemons,
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
