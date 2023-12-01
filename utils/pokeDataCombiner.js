import fsPromises from "fs/promises"
import { stringify } from "querystring"
import * as fs from 'fs';

const pokedata_source = JSON.parse(fs.readFileSync('./pokedex.json'))
const poketypes_source = JSON.parse(fs.readFileSync('./types.json'))


const PokeDataCombiner = {

    Combine : async function(){
        let pokemon_combined_data = []
        console.log(pokedata_source.length)


        for(let i = 0; i < pokedata_source.length-800; i++ )
        {
            const pokemon = pokedata_source[i];
            const name = pokemon.name.english.toLowerCase()
            console.log(name)
            //onsole.log("Poke " ,pokedata_source[i])
            //const types = pokemon.type
            //for(type in pokemon.type)
            //{

            //}
            try{
                
                //const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemon.name.english}/`)
                //console.log(response)
                //const resultTypes = await response.json();

                let fetchString = `https://pokeapi.co/api/v2/pokemon/${name}`;
                console.log("String:" ,fetchString);
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