const { Pokemon, Type } = require("../db");
const { default: axios } = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const { getStats } = require("../utils/utils");

/* Getting database pokemon */
const getPokemonFromDB = async (id) => {
  return Pokemon.findByPk(id, { include: Type });
};

// Función para obtener un Pokémon de la API externa
const getPokemonFromAPI = async (_id) => {
  try {
    const { data } = await axios(URL + _id);

    const stats = data.stats;
    const { id, name, sprites, weight, height } = data;
    const { attack, defense, speed, hp } = getStats(stats);
    const types = data.types.map((type) => type.type.name);

    const pokemon = {
      id,
      name,
      image: sprites.other["official-artwork"].front_default,
      type: types,
      attack,
      defense,
      speed,
      hp,
      weight,
      height,
    };

    return pokemon;
  } catch (error) {
    throw new Error("Error al obtener el Pokémon de la API");
  }
};

const getPokeById = async (req, res) => {
  
  try {
    const id = req.params.id;
    let pokemon;
    const validUUIDRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (validUUIDRegex.test(id)) {
      // Obtener el Pokémon de la base de datos
      pokemon = await getPokemonFromDB(id);
    } else {
      // Obtener el Pokémon de la API externa
      pokemon = await getPokemonFromAPI(id);
    }

    if (pokemon) {
      let response;

      if (pokemon.dataValues) {
        response = {
          ...pokemon.dataValues,
          type: pokemon.dataValues.types.map((type) => type.dataValues.name),
        };
      } else {
        response = {
          ...pokemon,
        };
      }

      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Pokemon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPokeById };
