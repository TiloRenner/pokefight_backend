import express from 'express'
import PokemonController from '../controller/pokemonController.js';

const router = express.Router()


router.get("/", PokemonController.getAllPokemon)
router.get("/:id", PokemonController.getSinglePokemon)
router.get("/:id/:info", PokemonController.getSinglePokemon)

export default router;

