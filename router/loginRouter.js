import express from 'express'
import LoginController from "../controller/loginController.js";

const router = express.Router()

router.post("/", LoginController.login)
router.get("/check", (req,res)=> {
    
    res.send("Hallo JWT Check")})

export default router;