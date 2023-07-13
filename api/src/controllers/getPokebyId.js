const { Pokemon, Type } = require("../db");
const { default: axios } = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";

// Función para obtener un Pokémon de la base de datos
const getPokemonFromDB = async (id) => {
  return Pokemon.findByPk(id, { include: Type });
};

// Función para obtener un Pokémon de la API externa
const getPokemonFromAPI = async (id) => {
  try {
    const { data } = await axios(URL + id);
    
    const stats = data.stats;
    const attackStat = stats.find((stat) => stat.stat.name === "attack");
    const defenseStat = stats.find((stat) => stat.stat.name === "defense");
    const speedStat = stats.find((stat) => stat.stat.name === "speed");
    const hpStat = stats.find((stat) => stat.stat.name === "hp");
    const types = data.types.map((type) => type.type.name);
    
    const pokemon = {
      id: data.id,
      name: data.name,
      attack: attackStat.base_stat,
      defense: defenseStat.base_stat,
      speed: speedStat.base_stat,
      hp: hpStat.base_stat,
      weight: data.weight,
      height: data.height,
      image: data.sprites.other["official-artwork"].front_default,
      type: types,
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
    
    if (id.length > 8) {
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
          ...pokemon
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