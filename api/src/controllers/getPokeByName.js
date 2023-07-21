const { default: axios } = require("axios");
const { getStats } = require("../utils/utils");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokeByName = async (req, res) => {
  try {
    const { name: namePoke } = req.query;

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

    if (pokemon.name) {
      res.json(pokemon);
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).json({ message: "Pokemon not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { getPokeByName };
