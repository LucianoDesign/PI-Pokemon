const { default: axios } = require("axios");
const { getStats } = require("../utils/utils");
const { Pokemon, Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonFromDB = async (name) => {
  return Pokemon.findOne({
    where: { name }, 
    include: Type,   
  });
};



const getPokeByName = async (req, res) => {
  try {
    const { name: namePoke } = req.query;

    // Buscar el Pokémon en la base de datos
    const pokemonFromDB = await getPokemonFromDB(namePoke.toLowerCase().trim());

    if (pokemonFromDB) {
      // Si el Pokémon está en la base de datos, devolverlo directamente
      /* res.json(pokemonFromDB); */
      response={
        ...pokemonFromDB.dataValues,
        type: pokemonFromDB.dataValues.types.map((type)=> type.dataValues.name),
      };

      delete response.types;

      res.json(response);
    } else {
      // Si no se encuentra en la base de datos, hacer la solicitud a la API externa
      const { data } = await axios.get(URL + namePoke.toLowerCase().trim());
      const stats = data.stats;
      const { id, name, sprites, weight, height } = data;
      const types = data.types.map((type) => type.type.name);
      const { attack, defense, speed, hp } = getStats(stats);

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

      res.json(pokemon);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Pokemon not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { getPokeByName };