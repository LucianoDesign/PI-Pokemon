const { default: axios } = require("axios");
const { Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/type";

getTypes = async (_, res) => {
  try {
    const existingTypes = await Type.findAll(); // Consultar los tipos existentes

    if (existingTypes.length > 0) {
      // La tabla ya tiene los tipos, no es necesario crearlos nuevamente
      return res.status(200).json(existingTypes);
    }

    const { data } = await axios(URL);
    const tipos = data.results.map((type) => ({ name: type.name }));

    await Type.bulkCreate(tipos); // Realizar la operación bulkCreate

    if (tipos.length > 0) {
      res.status(200).json(tipos);
    } else {
      res.status(400).json("Data not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getTypes };