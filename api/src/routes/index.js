const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const { getPokeById } = require("../controllers/getPokebyId");
const { getAllPokeData } = require("../controllers/getAllPokeData");
const { getTypes } = require("../controllers/getTypes");
const { getPokeByName } = require("../controllers/getPokeByName");
const { postPoke } = require("../controllers/postPoke");
const { deletePoke } = require("../controllers/deletePoke");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/types", getTypes);
router.get("/pokemons", getAllPokeData);
router.get("/:id", getPokeById);
router.get("/", getPokeByName);
router.post("/pokemons", postPoke);
router.delete("/:id", deletePoke)

module.exports = router;
