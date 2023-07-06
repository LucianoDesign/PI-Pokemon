const { Pokemon } = require('../db');

const postPoke = async (req, res) => {
    try {
        const { name , image, hp, attack, defense, speed, height, weight} = req.body;
        console.log(req.body)
        if(!name ||!image || !hp || !attack || !defense || !speed || !height || !weight ) {
            return res.status(404).json({message: "Missing data"});
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
                weight
            }
        });

        const [createdPokemon, created] = pokemon;

        if (created) {
            return res.status(200).json(createdPokemon);
        } else {
            return res.status(400).json({ message: "Pokemon already exists" });
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = { postPoke };