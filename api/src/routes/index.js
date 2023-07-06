const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const { getPokeById } = require("../controllers/getPokebyId");
const { getAllPokeData } = require("../controllers/getAllPokeData");
const { getTypes } = require("../controllers/getTypes");
const { getPokeByName} = require("../controllers/getPokeByName")
const { postPoke } = require("../controllers/postPoke")


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/types", getTypes);
router.get("/pokemons", getAllPokeData);
router.get("/", getPokeByName)
router.get("/:id", getPokeById); 
router.post("/pokemons", postPoke)

module.exports = router;
