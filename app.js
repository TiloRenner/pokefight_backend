import express from 'express'
import cors from 'cors'
import IndexRouter from './src/router/indexRouter.js'


const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))






app.listen(8080, ()=>{console.log("Server listening on ")})