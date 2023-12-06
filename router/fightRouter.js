import express from 'express'
import LoginController from "../controller/loginController.js";
import jwtCookieVerify from '../middlewares/jwtCookieVerify.js';
import FightController from '../controller/fightController.js';

const router = express.Router()

router.post("/start", jwtCookieVerify, FightController.fight)
router.get("/check", jwtCookieVerify, (req,res)=> {
    
    res.send("Hallo fight Check")})

export default router;