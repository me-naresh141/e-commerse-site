var express = require('express')
let User = require('../modals/user')
let Product = require('../modals/product')
let Cart = require('../modals/cart')
var router = express.Router()
let multer = require('multer')
const product = require('../modals/product')
const { get } = require('mongoose')

// multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now + file.originalname)
  },
})
var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.body.userId = req.session.userId
  Product.find({}, (err, product) => {
    Cart.find(req.body, (err, cart) => {
      return res.render('user', { product, cart })
    })
  })
})

// find form
router.get('/new', function (req, res, next) {
  let error = req.flash('error')
  return res.render('form', { error })
})

// admin
router.get('/admin', (req, res, next) => {
  Product.find({}, (err, product) => {
    return res.render('admin', { product })
  })
})
// create database

router.post('/', function (req, res, next) {
  let { email } = req.body
  let error = req.flash('error')
  User.find({ email }, (err, user) => {
    if (user) {
      req.flash('error', 'user allredy singup please sign-in')
      return res.redirect('/users/new')
    }
  })
  User.create(req.body, (err, user) => {
    if (err) return next(err)
    return res.redirect('/users/new')
  })
})

// handle sign in route
router.post('/sign-in', (req, res, next) => {
  let { email, password } = req.body
  if (!email || !password) {
    req.flash('error', 'Email password is required')
    return res.redirect('/users/new')
  }
  User.findOne({ email: email }, (err, user) => {
    // no user
    if (!user) {
      if (err) return next(err)
      req.flash('error', 'Email is invalid')
      return res.redirect('/users/new')
    }
    // password
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err)
      if (!result) {
        req.flash('error', 'Password is invalid')
        return res.redirect('/users/new')
      }
      // admin check
      if (user.admin === true) {
        req.session.userId = user.id
        return res.redirect('/users/admin')
      }
      req.session.userId = user.id
      return res.redirect('/users/cart')
    })
  })
})

// handle logout
router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.clearCookie('connect.sid')
  return res.redirect('/')
})

//add new product
router.post('/product', upload.single('image'), (req, res, next) => {
  req.body.image = req.file.filename
  Product.create(req.body, (err, product) => {
    if (err) return next(err)
    return res.redirect('/users/admin')
  })
})

// user addcart
router.get('/:id/addcart', (req, res, next) => {
  let id = req.params.id
  let userId = req.session.userId
  User.findByIdAndUpdate(userId, { $push: { productId: id } }, (err, user) => {
    if (err) return next(err)
    return res.redirect('/users/cart')
  })
})

//user  cart

router.get('/cart', (req, res, next) => {
  let userId = req.session.userId
  req.body.userId = req.session.userId
  User.findById(userId)
    .populate('productId')
    .exec((err, cartItem) => {
      Product.find({}, (err, product) => {
        Cart.find(req.body, (err, cart) => {
          return res.render('user', { product, cart, cartItem })
        })
      })
    })
})

// remove cart item
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  let userId = req.session.userId
  User.findByIdAndUpdate(userId, { $pull: { productId: id } }, (err, cart) => {
    if (err) return next(err)
    return res.redirect('/users/cart')
  })
})

module.exports = router
