const { default: axios } = require("axios");
const { Pokemon, Type } = require("../db");
const { getStats } = require("../utils/utils");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getAllPokeData = async (_, res) => {
  try {
    const { data } = await axios(`${URL}?limit=150`);

    const pokemonList = data?.results;

    const dbPokemonList = await Pokemon.findAll({ include: Type });

    const transformedDbPokemonList = dbPokemonList.map((pokemon) => {
      let pokemonDb = pokemon.dataValues;
      const types = pokemonDb.types.map((type) => type.name);

      return {
        id: pokemonDb.id,
        name: pokemonDb.name,
        image: pokemonDb.image,
        type: types,
        attack: pokemonDb.attack,
        defense: pokemonDb.defense,
        speed: pokemonDb.speed,
        hp: pokemonDb.hp,
        weight: pokemonDb.weight,
        height: pokemonDb.height,
      };
    });

    const pokemonDataList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const { data } = await axios(pokemon.url);
        const stats = data.stats;
        const { id, name, sprites, weight, height } = data;
        const { attack, defense, speed, hp } = getStats(stats);
        const types = data.types.map((type) => type.type.name);

        const pokemonData = {
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

        return pokemonData;
      })
    );
    const combinedDataList = [...pokemonDataList, ...transformedDbPokemonList];
    if (combinedDataList.length > 0) {
      res.status(200).json(combinedDataList);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllPokeData };
