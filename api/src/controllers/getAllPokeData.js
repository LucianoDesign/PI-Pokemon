const { default: axios } = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getAllPokeData = async (req, res) => {
  try {
    const { data } = await axios(URL + "?limit=151"); // Obtener la lista de todos los Pokémon (limit=10 para obtener los primeros 10)

    const pokemonList = data.results; // Array de objetos con los nombres y URLs de los Pokémon
    
    const pokemonDataList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const { data } = await axios(pokemon.url); // Obtener los datos individuales de cada Pokémon
        const stats = data.stats;
        const attackStat = stats.find((stat) => stat.stat.name === "attack");
        const types = data.types.map((type) => type.type.name); 

        // Crear un objeto con los datos del Pokémon
        const pokemonData = {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          type: types,
          attack: attackStat.base_stat,
        };

      
        return pokemonData;
      })
    );
    
    if (pokemonDataList.length > 0) {
      res.status(200).json(pokemonDataList);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllPokeData };