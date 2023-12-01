import * as fs from 'fs';

const pokedata = JSON.parse(fs.readFileSync('./pokedex_current.json'))


const PokemonController = {

    getAllPokemon: function(req,res)
    {
        res.json(pokedata)
    },
    getSinglePokemon: function(req,res)
    {
        const {id} = req.params;
        const {info} = req.params;

        console.log("Params:", req.params)

        let pokemon = pokedata.find(
            (pokemon => pokemon.id == id)
        )

        if(pokemon && info)
        {
            switch(info){
                case 'name':
                    console.log("Called Name")
                    res.status(200).json(pokemon.name)
                    break;
                case 'type':
                    console.log("Called Type")
                    res.status(200).json(pokemon.type)
                    break;
                case 'base':
                    console.log("Called Base")
                    res.status(200).json(pokemon.base)
                    break;
                default:
                    res.sendStatus(404)
                    break;
            }
            //res.status(200).json(pokemon)
        }
        else if(pokemon)
        {
            res.status(200).json(pokemon)
        }
        else{
            console.log("ID not found:",id)
            res.sendStatus(404)
        }
    },

    getSinglePokemonI: function(req,res)
    {
        const {id} = req.params;
        let pokemon = pokedata.find(
            (pokemon => pokemon.id == id)
        )
        if(pokemon)
        {
            res.status(200).json(pokemon)
        }
        else{
            console.log("ID not found:",id)
            res.sendStatus(404)
        }
    }




}

export default PokemonController;