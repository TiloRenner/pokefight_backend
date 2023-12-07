import express from 'express'
import jwtCookieVerify from '../middlewares/jwtCookieVerify.js'
import MongooseUser from '../utils/mongooseUser.js';


const router = express.Router()

router.post("/",jwtCookieVerify,  async (req,res)=> {

    const username = req.user.username;
    console.log("User:", req.user)
    const userExists = await MongooseUser.findUser(username)
    userExists[0].password =""
    console.log("userResult: ", userExists)
    res.json(userExists[0])


})

export default router