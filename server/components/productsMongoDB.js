import mongoose from "mongoose";
const Products = new mongoose.Schema({
   id: {type: String},
   title: {type: String},
   description: {type: String},
   price: {type: Number},
   discountPercentage: {type: Number},
   rating: {type: Number},
   stock: {type: Number},
   brand: {type: String},
   category: {type: String},
   thumbnail: {type: String},
   images: {type: Array}

})

export default mongoose.model("Products", Products)

