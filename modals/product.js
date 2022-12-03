let mongoose = require('mongoose')
let Schema = mongoose.Schema

let productSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    likes: { type: Number },
   
  },
  { timestamps: true },
)
module.exports = mongoose.model('Product', productSchema)
