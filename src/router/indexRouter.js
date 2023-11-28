import express from 'express'
import IndexController from '../controller/IndexController.js'


const router = express.Router()

router.get("/" , IndexController.Test)


export default router;
