import * as fs from 'fs';

const pokedata = JSON.parse(fs.readFileSync('./pokedex.json'))




const IndexController = {
    Test: function(req,res){
        console.log("index called")
        //console.log(pokedata)
    }

};

export default IndexController;