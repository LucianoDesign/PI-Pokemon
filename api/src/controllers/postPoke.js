const { Pokemon, Type } = require("../db");

const postPoke = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } =
      req.body;

    if (
      !name ||
      !image ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight
    ) {
      return res.status(400).json({ message: "Missing data" });
    }
    

    const pokemon = await Pokemon.findOrCreate({
      where: { name },
      defaults: {
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      },
    });

    const [createdPokemon, created] = pokemon;

    if (!created) {
      return res.status(409).json({ message: "Pokemon already exists" });
    }

    // Asociar los tipos al Pokémon creado
    const typesToAssociate = await Type.findAll({ where: { name: types } });
    await createdPokemon.setTypes(typesToAssociate);

    // Obtener los tipos asociados al Pokémon
    const associatedTypes = await createdPokemon.getTypes();

    // Construir el objeto de respuesta con los tipos incluidos
    const response = {
      ...createdPokemon.toJSON(),
      type: associatedTypes.map((type) => type.name),
    };
    return res.status(201).json(response);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postPoke };
