var express = require('express')
var router = express.Router()
let Product = require('../modals/product')

/* GET home page. */
router.get('/', function (req, res, next) {
  Product.find({}, (err, product) => {
    return res.render('index', { product })
  })
})

module.exports = router
