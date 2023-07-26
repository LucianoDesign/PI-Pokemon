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
  POST_POKEMON,
  FILTER_CREATED_POKEMONS,
  UPDATE_SELECTED_CREATED,
  DELETE_CREATED_POKEMON,
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
  selectedCreated: [],
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
      return {
        ...state,
        pokemons: [...state.pokemons, postedPokemon],
      };

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
          pokemonsPerPage: 50,
        };
      }

    case RESET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonByName: [],
        pokemonsPerPage: 12,
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

      const compareValues = (valueA, valueB) => {
        // Check if the values are numbers
        const isNumber = (value) => !isNaN(value);

        // Check if the values are UUIDs
        const isUUID = (value) =>
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            value
          );

        if (isNumber(valueA) && isNumber(valueB)) {
          return valueA - valueB;
        } else if (isUUID(valueA) && isUUID(valueB)) {
          // Convert UUIDs to lowercase for proper comparison
          const uuidA = valueA.toLowerCase();
          const uuidB = valueB.toLowerCase();
          return uuidA.localeCompare(uuidB);
        } else {
          return String(valueA).localeCompare(String(valueB));
        }
      };

      const sortByProperty = (property, order) => {
        const compareFunction = (a, b) => {
          if (property === "id") {
            const idA = a.id;
            const idB = b.id;
            return order ? compareValues(idA, idB) : compareValues(idB, idA);
          }

          return order
            ? compareValues(a[property], b[property])
            : compareValues(b[property], a[property]);
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
        case "asc_hp":
          sortByProperty("hp", true);
          break;
        case "desc_hp":
          sortByProperty("hp", false);
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
    case FILTER_CREATED_POKEMONS:
      const filteredCreated = state.pokemons.filter((pokemon) => {
        return pokemon.id.length > 12;
      });
      const TotalCreatedPages = Math.ceil(
        filteredCreated.length / state.pokemonsPerPage
      );
      return {
        ...state,
        filteredPokemons: filteredCreated,
        totalPages: TotalCreatedPages,
        currentPage: 1,
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
      return {
        ...state,
        selectedTypes: action.payload,
      };
    case UPDATE_SELECTED_CREATED:
      return {
        ...state,
        selectedCreated: action.payload,
      };
    case DELETE_CREATED_POKEMON:
      const deletedPokemonId = action.payload;
      const updatedPokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== deletedPokemonId
      );
      const updateFilteredPokemons = state.filteredPokemons.filter(
        (pokemon) => pokemon.id !== deletedPokemonId
      );
      const updatePokemonByName = state.pokemonByName.filter(
        (pokemon) => pokemon.id !== deletedPokemonId
      );
      return {
        ...state,
        pokemons: updatedPokemons,
        filteredPokemons: updateFilteredPokemons,
        pokemonByName: updatePokemonByName,
      };
    default:
      return state;
  }
};

export default rootReducer;
