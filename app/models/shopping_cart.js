var mongoose = require('mongoose')
var ShoppingCartSchema = require('../schemas/shopping_cart')
var ShoppingCart = mongoose.model('shoppingCarts', ShoppingCartSchema)

module.exports = ShoppingCart