let express = require('express')
const product = require('../modals/product')
let Product = require('../modals/product')
let router = express.Router()

// delete product
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Product.findByIdAndDelete(id, (err, product) => {
    if (err) return next(err)
    return res.redirect('/users/admin')
  })
})

// update product

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Product.findById(id, (err, product) => {
    console.log(product)
    return res.render('editproduct', { product })
  })
})

module.exports = router
