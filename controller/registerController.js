//import User from '../models/userModel.js';
import 'dotenv/config'
//import mongoose from 'mongoose';
import LoginController from './loginController.js';
import MongooseUser from '../utils/mongooseUser.js';

MongooseUser.ConnectDB()

const RegisterController = {


    register : async function(req,res)
    {
        const {username,password} = req.body

        try{
            const matchingUser = await MongooseUser.findUser(username)
            console.log(matchingUser)
            if(matchingUser && matchingUser.length == 0)
            {
                MongooseUser.createUserWithPassword(username,password)

                //res.json({Result:"User Created", username: username})
                req.body.pokeUserJustRegistered = true;
                console.log("Reg", req.PokeRegister)
                LoginController.login(req,res)
            }
            else{
                console.log("User alread exists,login attempt")
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

export default RegisterController;