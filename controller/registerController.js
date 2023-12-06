import User from '../models/userModel.js';
import 'dotenv/config'
import mongoose from 'mongoose';
import LoginController from './loginController.js';


ConnectDB()


async function ConnectDB(){

    try{
        mongoose.connect(process.env.DB_URI)
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'))
        db.on('disconnected',function(){console.log("Disconnected DB")})
        db.once('open', function(){console.log('DB Connected')})
    }
    catch(err)
    {
        console.log("MongooseError:" ,err.message)
    }

}

const RegisterController = {


    register : async function(req,res)
    {
        const {username,password} = req.body

        try{
            const matchingUser = await findUser(username)
            console.log(matchingUser)
            if(matchingUser && matchingUser.length == 0)
            {
                createUser(username,password)
                res.json({Result:"User Created", username: username})
            }
            else{
                console.log("User alread exists")
                //res.json({Result:"User Not Created,already exists", username: username}).
                LoginController.login(req,res)
            }
        }
        catch(err)
        {
            console.log("RegisterError:", err.message)
        } 
        //res.send(`Register Route ${username}, ${password}`)
    }
}

async function createUser(username,password)
{
    try{
        const user = await User.create({
            username:username,
            password:password,
        })
        console.log("Created User in DB", user)
    }
    catch(err)
    {
        console.log("Error creating new User: ", err.message)
    }

}

async function findUser(username)
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
}

async function findUserWithPassword(username,password)
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
}

export default RegisterController;