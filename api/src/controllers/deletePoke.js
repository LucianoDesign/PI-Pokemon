const { Pokemon } = require("../db");

const deletePoke = async (req, res) =>{
    try {
        const id = req.params.id;
        await Pokemon.destroy({
            where: { id: id }
        });
        return res.status(200).json(id);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

module.exports = {deletePoke};