import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    wins: Number,
    pastFights:[{fightResult: String}]

});

export default mongoose.model("User", userSchema)