import axios from "axios";
import {
  LOAD_POKEMONS,
  LOAD_TYPES,
  CHANGE_PAGE,
  SORT_POKEMONS,
  SET_POKEMON_NAME,
  RESET_POKEMON_BY_NAME,
  FILTER_POKEMONS_BY_TYPE,
  RESET_FILTERED_POKEMONS,
} from "./actionTypes";

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
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const loadPokemonName = (name) => {
  const formattedName = name.toLowerCase().trim();
  const endpoint = URL + `/${formattedName}`;
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
  };
};

export const resetpokemonByName = () => ({
  type: RESET_POKEMON_BY_NAME,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  payload: page,
});

export const sortPokemons = (sortOrder) => ({
  type: SORT_POKEMONS,
  payload: {
    sortOrder,
  },
});

export const filterPokemonsByType = (selectedTypes) => ({
  type: FILTER_POKEMONS_BY_TYPE,
  payload: selectedTypes,
});

export const resetFilteredPokemons = () => ({
  type: RESET_FILTERED_POKEMONS,
});
