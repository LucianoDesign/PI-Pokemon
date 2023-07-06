const { default: axios } = require("axios");
const { Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/type";

getTypes = async (req, res) => {
  try {
    const { data } = await axios(URL);
    const tipos = data.results.map((type) => ({ name: type.name }));
    Type.bulkCreate(tipos);

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
