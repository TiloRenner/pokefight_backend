import User from '../models/userModel.js';
import 'dotenv/config'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'




ConnectDB()


const token_secret = process.env.TOKEN_SECRET;


async function ConnectDB(){

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

}



const LoginController = {

    login :async function (req,res){
        console.log("loginRoute")
        const {username,password} = req.body
        try{
            const matchingUserWithPassword = await findUserWithPassword(username,password)
            console.log("Found",matchingUserWithPassword)
            const token = await jwt.sign({username:username},token_secret,{expiresIn: '1800s'});
            if(matchingUserWithPassword && matchingUserWithPassword.length == 1)
            {            
                console.log("Length ok",matchingUserWithPassword)

                //const token = await generateAccessToken({username:username})
                console.log("SendToken:",token)
                //res.json(token)
                res.cookie("pokefight_token", token, {httpOnly: true}).json({msg:"loggedIn"})
                //res.json({Result: "loggedIn", username:username})
            }
            else{
                //res.json({Result: "rejected", username: username})
                const userExists = findUser(username)
                if(userExists == userExists.length == 1)
                {
                    res.status(403).json({msg: "invalid Login"})
                }
                else{
                    createUserWithPassword(username,password)
                    res.cookie("pokefight_token", token, {httpOnly: true}).json({msg:"loggedIn"}).json({Result:"User Created and Logged in", username: username})
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

async function findUserWithPassword(username,password)
{
    try{
        console.log("Start find:",username)
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



async function createUserWithPassword(username,password)
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

export default LoginController;