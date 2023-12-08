import * as fs from 'fs';
//import mongoose from 'mongoose';
import MongooseUser from '../utils/mongooseUser.js';

const pokedata = JSON.parse(fs.readFileSync('./pokedex_current.json'))


const PokemonController = {



    addPokemon: async (req,res) =>
    {
        console.log("Add Pokemon")
        //Check if user exists, 
        //check if user already has pokemon, better check in fight already
        const username = req.user.username;

        if(req.body.pokemon_id)
        {
            const isPokemonOwned = await MongooseUser.findPokemonInUser(username,req.body.pokemon_id)
            
            if(isPokemonOwned)
            {
                res.json({msg:"Pokemon already owned by " + username})
            }
            else{
                const userPokemon = addPokemonToUser(req.body.pokemon_id,username)
                res.json(userPokemon)
            }


        }
        else{
            res.json({msg:"keine valide ID"})
        }
    },
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
    },
    addPokemonToUser(id,username){
        addPokemonToUser(id,username)
    }





}

function addPokemonToUser (id,username) {

        
    let pokemon = pokedata.find(
        (pokemon => pokemon.id == id)
    )
    console.log("PokemonFromJSON")

    let userPokemon = createUserPokemon(pokemon)
    MongooseUser.addPokemonForUser(username,userPokemon)
    return userPokemon;
}


function createUserPokemon(pokemon)
{
    let userPokemon = {
        id: pokemon.id,
        name: {
          english: pokemon.name.english,
          japanese: pokemon.name.japanese,
          chinese: pokemon.name.chinese,
          french: pokemon.name.french
        },
        type: [
        ],
        base: {
          HP: pokemon.base.HP,
          Attack: pokemon.base.Attack,
          Defense: pokemon.base.Defense,
          SpAttack: pokemon.base["Sp. Attack"],
          SpDefense: pokemon.base["Sp. Defense"],
          Speed: pokemon.base.Speed
        }
      }

      pokemon.type.forEach((type)=> {
        userPokemon.type.push(type)
      })

      userPokemon.damage_relations = pokemon.damage_relations
      userPokemon.sprites = pokemon.sprites
      console.log(userPokemon)

      return userPokemon;
}

export default PokemonController;