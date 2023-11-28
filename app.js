import express from 'express'
import cors from 'cors'
//import IndexRouter from './router/indexRouter.js'
import PokemonRouter from './router/pokemonRouter.js'
import 'dotenv/config'

const {PORT} = process.env
console.log(PORT)

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//app.use("/", IndexRouter)
app.use("/pokemon", PokemonRouter)


app.listen(PORT, ()=>{console.log(`Server listening on ${PORT} `)})