import * as fs from 'fs';



const FightController = {
    fight: function (req,res){
        let {pokemon1,pokemon2,trainer1,trainer2} = req.body

        if(!trainer1)
        {
            trainer1 = "Wild Pokemon"
        }
        if(!trainer2)
        {
            trainer2 = "Wild Pokemon"
        }

        const twoPokemon = createTwoPokemonWithAdjustedStats(pokemon1,pokemon2)

        const result = comparePokemon(twoPokemon[0],twoPokemon[1])

        console.log("The Winner is:" ,twoPokemon[result])


        

        //console.log("TwoPokemon:" ,twoPokemon)
        if(result == 0)
        {
            res.json({Winner: {pokemon: twoPokemon[0].name.english, trainer:trainer1 }})
        }
        else{
            res.json({Winner: {pokemon: twoPokemon[1].name.english, trainer:trainer2 }})
        }

        


    }
}

function adjustPokemonBase(enemyTypes,pokemonBase)
{

    console.log("Pokemon BeforeAdjust:", pokemonBase)
    //Check Double Damage, half defense
    enemyTypes.forEach(enemyType => {
        const weakDefense = pokemonBase.damage_relations.double_damage_from.find((type)=>{
            //console.log("TypeDDF:",type.name)
            return type.name == enemyType.toLowerCase();
        })
            if(weakDefense){
                console.log("WeakDefense:", weakDefense)
                pokemonBase.base.Defense /= 2;
            } 

        const strongDefense = pokemonBase.damage_relations.half_damage_from.find((type)=>{
            //console.log("Type:",type.name)
            return type.name == enemyType.toLowerCase();
        })
            if(strongDefense) 
            {
                console.log("StrongDefense:", strongDefense)
                pokemonBase.base.Defense *= 2;
            }
            
        const megaDefense = pokemonBase.damage_relations.no_damage_from.find((type)=>{
            //console.log("Type:",type.name)
            return type.name == enemyType.toLowerCase();
        })
            if(megaDefense)
            {
                console.log("MegaDefense:", megaDefense)
                pokemonBase.base.Defense *= 4;
            } 

        const weakOffense = pokemonBase.damage_relations.double_damage_from.find((type)=>{
            //console.log("Type:",type.name)
            return type.name == enemyType.toLowerCase();
        })
            if(weakOffense)
            {
                console.log("WeakOffense:", weakOffense)
                pokemonBase.base.Attack /= 2;
            } 

        const strongOffense = pokemonBase.damage_relations.half_damage_from.find((type)=>{
            //console.log("Type:",type.name)
            return type.name == enemyType.toLowerCase();
        })
        if(strongOffense) {

            pokemonBase.base.Attack *= 2;}

        const noOffense = pokemonBase.damage_relations.no_damage_from.find((type)=>{
           //console.log("Type:",type.name)
            return type.name == enemyType.toLowerCase();
        })
        if(noOffense){
            console.log("NoOffense:", noOffense)
            pokemonBase.base.Attack /= 4;
        } 
    });
    console.log("Pokemon AfterAdjust:", pokemonBase)

}

function createTwoPokemonWithAdjustedStats(pokemon1Name,pokemon2Name){


    const pokemon1Base = getPokemonBaseByName(pokemon1Name);
    const pokemon2Base = getPokemonBaseByName(pokemon2Name);

    const AdjustedPokemon1 = adjustPokemonBase(pokemon2Base.type,pokemon1Base)
    const AdjustedPokemon2 = adjustPokemonBase(pokemon1Base.type,pokemon2Base)

    return [pokemon1Base,pokemon2Base];
}

function getPokemonBaseByName(name)
{
    const pokedata = JSON.parse(fs.readFileSync('./pokedex_current.json'))
    console.log("Look for:", name)
    let pokemon = pokedata.find((pokemon)=> {
        //console.log("Checking:", pokemon.name.english)
        return pokemon.name.english == name
    })
    //console.log("found:", pokemon)
    return pokemon
}

function comparePokemon(pokemon1, pokemon2) {
    let score1 = 0;
    let score2 = 0;
   
    if (pokemon1.HP > pokemon2.HP) score1++;
    if (pokemon1.Attack > pokemon2.Attack) score1++;
    if (pokemon1.Defense > pokemon2.Defense) score1++;
    if (pokemon1.Speed > pokemon2.Speed) score1++;

    if (pokemon2.HP > pokemon1.HP) score2++;
    if (pokemon2.Attack > pokemon1.Attack) score2++;
    if (pokemon2.Defense > pokemon1.Defense) score2++;
    if (pokemon2.Speed > pokemon1.Speed) score2++;
   
    if (score1 > score2) {
      return 0;
    } else if (score2 > score1) {
      return 1;
    } else {
        const luckyWinner = getRandomInt(2)
        if(luckyWinner == 0)
        {
            return 0;
        }
        else
        {
            return 1;
        }

      return null; // Unentschieden
    }
   }

   function getRandomInt(max)
   {
        return Math.floor(Math.random()* max)
   }

export default FightController;