import mongoose from "mongoose";

const AuthMongoDB = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true,  required: true},
    password: {type: String, required: true},
    phone: {type: String},
    address: {type: String},
})

export default mongoose.model("Auth", AuthMongoDB)