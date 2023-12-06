import express from 'express'
import cors from 'cors'
//import PokeDataCombiner from './utils/pokeDataCombiner.js'
//import IndexRouter from './router/indexRouter.js'
import PokemonRouter from './router/pokemonRouter.js'
import LoginRouter from './router/loginRouter.js'
import RegisterRouter from './router/registerRouter.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const {PORT} = process.env
console.log(PORT)

const app = express()


const allowCrossDomain = (req, res, next) => {
    //res.header(`Access-Control-Allow-Origin`, `http://localhost/`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };

app.use(cors({credentials: true, origin: `http://localhost:5173`, methods:[`GET,PUT,POST,DELETE`],allowedHeaders:[`Content-Type`,`Authorization`]}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
//app.use(allowCrossDomain)

//app.use("/", IndexRouter)
app.use("/pokemon", PokemonRouter)

//PokeDataCombiner.WriteFileTest([]);
//PokeDataCombiner.Combine();

app.use("/auth/login",LoginRouter)
app.use("/auth/register",RegisterRouter)

//PokeDataCombiner.WriteFileTest([]);
//cd.PokeDataCombiner.Combine();

app.listen(PORT, ()=>{console.log(`Server listening on ${PORT} `)})