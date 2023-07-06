const { default: axios } = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokeById = async (req, res) => {
  try {
    const id = req.params.id;
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

    pokemon.name
      ? res.status(200).json(pokemon)
      : res.status(400).send("Not Found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getPokeById };
