import User from '../models/userModel.js';
import 'dotenv/config'
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URI)


const RegisterController = {


    register : async function(req,res)
    {
        const {username,password} = req.body

        try{
            const matchingUser = await findUserWithPassword(username,password)
            console.log(matchingUser)
            if(matchingUser && matchingUser.length == 0)
            {
                createUser(username,password)
                res.json({Result:"User Created", username: username})
            }
            else{
                res.json({Result:"User Not Created", username: username})
            }
        }
        catch(err)
        {

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