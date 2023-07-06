import axios from "axios";

export const LOAD_POKEMONS = "LOAD_POKEMONS";
export const LOAD_TYPES = "LOAD_TYPES";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const SORT_POKEMONS = "SORT_POKEMONS";
export const SET_POKEMON_NAME = "SET_POKEMON_NAME"
export const RESET_CURRENT_POKEMON = "RESET_CURRENT_POKEMON";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE";
export const RESET_FILTERED_POKEMONS = "RESET_FILTERED_POKEMONS";

export const URL = "http://localhost:3001/pokemon";

export const loadPokemons = () => {
  const endpoint = URL + "/pokemons";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: LOAD_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const loadPokemonTypes = () => {
  const endpoint = URL + "/types";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: LOAD_TYPES,
        payload: data,
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const loadPokemonName = (name) => {
  const formattedName = name.toLowerCase().trim();
  const endpoint = URL + `/${formattedName}`
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      
          return dispatch({
            type: SET_POKEMON_NAME,
            payload: data,
          });
        
       
    } catch (error) {
      console.log("Nombre o ID invalido");
    }
  }
}


export const resetCurrentPokemon = () => ({
  type: RESET_CURRENT_POKEMON,
});

export const changePage = (page) => ({
  type: "CHANGE_PAGE",
  payload: page,
});

export const sortPokemons = (sortOrder) => ({
  type: "SORT_POKEMONS",
  payload: {
    sortOrder,
  }
})

export const filterPokemonsByType = (selectedTypes) => ({
  type: FILTER_POKEMONS_BY_TYPE,
  payload: selectedTypes,
});

export const resetFilteredPokemons = () => ({
  type: RESET_FILTERED_POKEMONS,
})