import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    wins: Number,
    pastFights:[{fightResult: String}],
    ownedPokemon:[]

});

export default mongoose.model("User", userSchema)

/*
{
        id: Number,
        name: {
          english: String,
          japanese: String,
          chinese: String,
          french: String
        },
        type: [
            String,
            String
        ],
        base: {
          HP: Number,
          Attack: Number,
          Defense: Number,
          SpAttack: Number,
          SpDefense: Number,
          Speed: Number
        }
      }
      */