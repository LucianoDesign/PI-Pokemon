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
  FILTER_CREATED_POKEMONS,
  UPDATE_SELECTED_CREATED,
  DELETE_CREATED_POKEMON,
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
      dispatch({
        type: POST_POKEMON,
        payload: data,
      });
      if (data) {
        window.alert("Pokemon created");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        window.alert(
          error.response.data.message || "check url length from image field"
        );
      } else if (error.request) {
        console.log("Error request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
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
      const { data } = await axios.get(`?name=${formattedName}`);

      return dispatch({
        type: SET_POKEMON_NAME,
        payload: data,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Pokemon not found. Please try again with a different name.");
      } else {
        alert("An error occurred. Please try again later.");
      }
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

export const filterCreatedPokemons = () => ({
  type: FILTER_CREATED_POKEMONS,
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
export const updateSelectedCreated = (selectedCreated) => ({
  type: UPDATE_SELECTED_CREATED,
  payload: selectedCreated,
});

export const deleteCreatedPokemon = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/${id}`);
      return dispatch({
        type: DELETE_CREATED_POKEMON,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
