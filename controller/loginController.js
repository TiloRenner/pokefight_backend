//import User from '../models/userModel.js';
import 'dotenv/config'
//import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import MongooseUser from '../utils/mongooseUser.js';


MongooseUser.ConnectDB()


const token_secret = process.env.TOKEN_SECRET;

const LoginController = {

    login :async function (req,res){
        console.log("loginRoute")
        const {username,password} = req.body
        const {pokeUserJustRegistered} = req.body
        try{
            const matchingUserWithPassword = await MongooseUser.findUserWithPassword(username,password)
            console.log("Found",matchingUserWithPassword)
            const token = await jwt.sign({username:username},token_secret,{expiresIn: '24h'});
            if(matchingUserWithPassword && matchingUserWithPassword.length >= 1)
            {            
                console.log("Length ok",matchingUserWithPassword)

                //const token = await generateAccessToken({username:username})
                console.log("SendToken:",token)
                res.cookie("pokefight_token", token, {httpOnly: true}).json({msg:"loggedIn", login_token:token})
            }
            else{
                //res.json({Result: "rejected", username: username})
                const userExists = await MongooseUser.findUser(username)
                console.log("UserExists at all:", userExists)
                if(userExists && userExists.length >= 1)
                {
                    res.status(403).json({msg: "invalid Login"})
                }
                else{
                    MongooseUser.createUserWithPassword(username,password)
                    res.cookie("pokefight_token", token, {httpOnly: true}).json({Result:"User Created and Logged in", username: username})
                }
            }
        }
        catch(err)
        {

        }
        //res.send(`Login Route ${username}`)
    }
}

function generateAccessToken(username)
{
    console.log("start JWT SIGN")
    return jwt.sign(username,process.env.TOKEN_SECRET,{expiresIn: '1800s'});
}

export default LoginController;