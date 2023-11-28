import express from 'express'
import PokemonController from '../controller/pokemonController.js';

const router = express.Router()


router.get("/", PokemonController.getAllPokemon)
router.get("/:id", PokemonController.getOnePokemon)
router.get("/:id/:info", PokemonController.getOnePokemon)

export default router;

