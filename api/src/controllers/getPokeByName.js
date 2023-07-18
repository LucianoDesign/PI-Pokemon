const { default: axios } = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokeByName = async (req, res) => {
  try {
    const { namePoke } = req.query;

    const { data } = await axios.get(URL + namePoke.toLowerCase().trim());
    const { id, name, sprites } = data;
    const types = data.types.map((type) => type.type.name);

    const pokemon = {
      id,
      name,
      imagen: sprites.other["official-artwork"].front_default,
      type: types,
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
