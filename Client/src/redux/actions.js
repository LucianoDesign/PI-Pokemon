/* eslint-disable no-console */
import axios from "../utils/axios";
import {
  LOAD_POKEMONS,
  LOAD_TYPES,
  CHANGE_PAGE,
  SORT_POKEMONS,
  SET_POKEMON_NAME,
  RESET_POKEMON_BY_NAME,
  FILTER_POKEMONS_BY_TYPE,
  RESET_FILTERED_POKEMONS,
  UPDATE_SELECTED_TYPES,
  POST_POKEMON,
} from "./actionTypes";


export const loadPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/pokemons");
      return dispatch({
        type: LOAD_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postPokemon = (pokemonData) => {

  return async (dispatch) => {
    try {
      const { data } = await axios.post("/pokemons", pokemonData);
      return dispatch({
        type: POST_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const loadPokemonTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/types");
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
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/${formattedName}`);

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

export const updateSelectedTypes = (selectedTypes) => {
  return {
    type: UPDATE_SELECTED_TYPES,
    payload: selectedTypes,
  };
};
