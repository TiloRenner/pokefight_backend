import User from '../models/userModel.js';
import 'dotenv/config'
import mongoose from 'mongoose';


mongoose.connect(process.env.DB_URI)

const LoginController = {

    login :async function (req,res){
        const {username,password} = req.body
        try{
            const matchingUser = await findUserWithPassword(username,password)
            console.log("Found",matchingUser)
            if(matchingUser && matchingUser.length == 1)
            {            
                console.log("Length ok",matchingUser)
                //createUser(username,password)
                res.json({Result: "loggedIn", username:username})
            }
            else{
                res.json({Result: "rejected", username: username})
            }
        }
        catch(err)
        {

        }

        //res.send(`Login Route ${username}`)
    }


}

async function findUserWithPassword(username,password)
{
    //const User = mongoose.model("User", UserSchema)

    try{
        console.log("Start find:")
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

export default LoginController;