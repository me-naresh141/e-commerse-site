let mongoose = require('mongoose')
let Schema = mongoose.Schema

let cartSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Cart', cartSchema)
