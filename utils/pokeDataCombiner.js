import fsPromises from "fs/promises"
import { stringify } from "querystring"
import * as fs from 'fs';

const pokedata_source = JSON.parse(fs.readFileSync('./pokedex.json'))
const poketypes_source = JSON.parse(fs.readFileSync('./types.json'))


const PokeDataCombiner = {

    Combine : async function(){
        let pokemon_combined_data = []
        console.log(pokedata_source.length)


        for(let i = 0; i < pokedata_source.length; i++ )
        {
            const pokemon = pokedata_source[i];
            const name = pokemon.name.english.toLowerCase()
            console.log(name)
            try{
                let damages = {
                    double_damage_from: [],
                    half_damage_from:[],
                    no_damage_from:[],
                    double_damage_to: [],
                    half_damage_to:[],
                    no_damage_to:[],
                }
                for(let y = 0; y < pokemon.type.length; y++)
                {
                    const poketype = pokemon.type[y];
                    console.log("TYPE:" , poketype)
                    const response = await fetch(`https://pokeapi.co/api/v2/type/${poketype.toLowerCase()}/`)
                    //console.log(response)
                    const resultPokeType = await response.json();
                    console.log("TypeData:", resultPokeType.damage_relations)
                    resultPokeType.damage_relations.double_damage_from.forEach(element => {
                        damages.double_damage_from.push(element)
                    });
                    resultPokeType.damage_relations.half_damage_from.forEach(element => {
                        damages.half_damage_from.push(element)
                    });
                    resultPokeType.damage_relations.no_damage_from.forEach(element => {
                        damages.no_damage_from.push(element)
                    });
                    resultPokeType.damage_relations.double_damage_to.forEach(element => {
                        damages.double_damage_to.push(element)
                    });
                    resultPokeType.damage_relations.half_damage_to.forEach(element => {
                        damages.half_damage_to.push(element)
                    });
                    resultPokeType.damage_relations.no_damage_to.forEach(element => {
                        damages.no_damage_to.push(element)
                    });

                }
                pokemon.damage_relations = damages


                let fetchString = `https://pokeapi.co/api/v2/pokemon/${name}`;
                //npm console.log("String:" ,fetchString);
                const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const resultPokemon = await response2.json();
                //pokemon.damage_relations = resultTypes.damage_relations;
                //const {sprites:{'official-artwork'}}
                pokemon.sprites = resultPokemon.sprites;
                pokemon.sprites.other.official_artwork = resultPokemon.sprites.other['official-artwork'];
            }
            catch(err){
                console.log("Fehler beim Pokedaten kombinieren:", err.message)
            }
            pokemon_combined_data.push(pokemon)
        }

        this.WriteFileTest(pokemon_combined_data)






    },
    WriteFileTest : async function WriteFileTest(data)
    {
        const content = {test:true}
    
        try{
            console.log("Try Write");
            await fsPromises.writeFile("pokedex_current.json",JSON.stringify(data,null,2))
        }
        catch(err)
        {
            console.log("Error trying to write file:", err.message);
        }
    }
}




export default PokeDataCombiner