import mongoose from "mongoose";
const OrderMongoDB = new mongoose.Schema({
   id: {type: String},
   fullName: {type: String},
   address: {type: String},
   phone: {type: String},
   email: {type: String},
   delivery: {type: String},
   order: {type: Array},
   timeCreate: {type: String},
})

export default mongoose.model("Order", OrderMongoDB)