import * as fs from 'fs';

const pokedata = JSON.parse(fs.readFileSync('./pokedex.json'))


const PokemonController = {

    getAllPokemon: function(req,res)
    {
        res.json(pokedata)
    },
    getOnePokemon: function(req,res)
    {
        const {id} = req.params;
        

        console.log("ID:",id)
    }




}

export default PokemonController;