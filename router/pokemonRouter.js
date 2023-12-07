import express from 'express'
import PokemonController from '../controller/pokemonController.js';
import jwtCookieVerify from '../middlewares/jwtCookieVerify.js';

const router = express.Router()

router.get("/check/",jwtCookieVerify, (req,res)=> {


    console.log("User in token:", req.user)
    res.send("Reached Protected Route?")
})
router.post("/addToUser",jwtCookieVerify, PokemonController.addPokemon)
router.get("/", PokemonController.getAllPokemon)
router.get("/:id", PokemonController.getSinglePokemon)
router.get("/:id/:info", PokemonController.getSinglePokemon)


export default router;

