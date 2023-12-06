import express from 'express'
import MongooseUser from '../utils/mongooseUser.js';

const router = express.Router()


router.get("/", async (req,res)=> {

    const leaderBoard = await MongooseUser.getLeaderBoard()

    res.json(leaderBoard)

})


export default router;