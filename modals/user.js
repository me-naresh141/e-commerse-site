let mongoose = require('mongoose')
const { checkout } = require('../routes')
let Schema = mongoose.Schema
let bcrypt = require('bcrypt')
let userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    mobile: { type: Number, required: true, minlength: 10, maxlength: 10 },
    admin: { type: Boolean, default: false, required: true },
    productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
)

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err)
      this.password = hashed
      return next()
    })
  }
})

// password check
userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result)
  })
}

module.exports = mongoose.model('User', userSchema)
