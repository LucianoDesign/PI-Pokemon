const { default: axios } = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokeByName = async (req, res) => {
    try {
        const {name} = req.query ;
        /* if (!name || name.trim() === "") {
          return res.json({ message: "Missing name parameter. Returning all pokemons." });
        } */
        const { data } = await axios.get( URL + name.toLowerCase().trim() );
        
        const types = data.types.map((type) => type.type.name);
        console.log(data.name)

        const pokemon = {
          id: data.id,
          name: data.name,
          imagen: data.sprites.other["official-artwork"].front_default,
          type: types,
        };
        
        if (pokemon.name) {
            res.json(pokemon);
          } else {
            res.status(404).json({ message: error.message } );
          }
    } catch (error) {
      if (error.response.status === 404) {
        res.status(404).json({ message: "Pokemon not found" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
}

module.exports = { getPokeByName };