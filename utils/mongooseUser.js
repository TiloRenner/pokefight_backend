
import User from '../models/userModel.js';
import 'dotenv/config'
import mongoose from 'mongoose';

const MongooseUser = {

    ConnectDB :async function(){

        try{
            mongoose.connect(process.env.DB_URI,{serverSelectionTimeoutMS: 1000})
            const db = mongoose.connection
            db.on('error', console.error.bind(console, 'connection error:'))
            db.on('disconnected',function(){console.log("Disconnected DB")})
            db.once('open', function(){console.log('DB Connected')})
            db.on('timeout',function(err){ console.log("Timeout: " ,err.message)})
        }
        catch(err)
        {
            console.log("MongooseError:" ,err.message)
        }
    
    },

    createUserWithPassword :async function(username,password)
    {
        try{
            const user = await User.create({
                username:username,
                password:password,
                wins:0
            })
            console.log("Created User in DB", user)
        }
        catch(err)
        {
            console.log("Error creating new User: ", err.message)
        }

    },
    findPokemonInUser: async function(username,pokemon_id)
    {
        //const User = mongoose.model("User", UserSchema)
    
        try{
            const matchingUser = await User.find(
                {
                    username:username,
                }
            ).exec()
    
            console.log("User found:", matchingUser)

            let matchingPokemon = null;

            if(matchingUser[0].ownedPokemon)
            {
                matchingPokemon = matchingUser[0].ownedPokemon.find((pokemon)=> {

                    console.log("Pokes:",pokemon)
                    return pokemon_id == pokemon.id;
                })
                console.log("Match?", matchingPokemon)
            }
            else
            {
                console.log("No Pokemon yet:")
            }

            return matchingPokemon;
        }
        catch(err)
        {
            console.log("Error Getting username and password from db", err.message)
            return null;
        }
    },

    findUser: async function(username)
    {
        //const User = mongoose.model("User", UserSchema)
    
        try{
            const matchingUser = await User.find(
                {
                    username:username,
                }
            ).exec()
    
            console.log("User found:", matchingUser)
            return matchingUser;
        }
        catch(err)
        {
            console.log("Error Getting username and password from db", err.message)
            return null;
        }
    },
    
    findUserWithPassword: async function(username,password)
    {
        //const User = mongoose.model("User", UserSchema)
    
        try{
            const matchingUser = await User.find(
                {
                    username:username,
                    password:password
                }
    
            ).exec()
    
            console.log("User found:", matchingUser)
            return matchingUser;
        }
        catch(err)
        {
            console.log("Error Getting username and password from db", err.message)
            return null;
        }
    },

    addWinForUser: async function(username,fightresult)
    {
        try{
            await User.updateOne({username: username},
                { $inc: {wins:1}, $push: {pastFights: {fightResult:fightresult}}}
            )
        }
        catch(err)
        {
            console.log("Error adding Win", err.message)
        }

    },
    addPokemonForUser: async function(username,pokemon)
    {
        try{
            //Todo check if user owns Pokemon
            await User.updateOne({username: username},
                { $push: {ownedPokemon: pokemon}}
            )
        }
        catch(err)
        {
            console.log("Error adding Win", err.message)
        }

    },

    getLeaderBoard: async function()
    {
        try{
            const users = await User.find({}).sort({wins:-1})
            console.log(users)
            let usermap = []
            users.forEach(()=> {
                


            })

            const newUsersArray = users.map((user) => {

                const newUser = {
                    username: user.username, 
                    wins: user.wins,
                    pastFights: user.pastFights
                
                };
                return newUser;
            })
            console.log("New:" , newUsersArray)
            return newUsersArray;
            
        }
        catch(err)
        {
            console.log("Mongoose FindAll Users Error:", err.message)
        }
    }

}

export default MongooseUser;



