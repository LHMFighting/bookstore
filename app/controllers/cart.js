var Book = require('../models/book')
var Cart = require('../models/shopping_cart')
var _ = require('underscore')

// index page
exports.list = function (req, res) {
    res.render('cart', {
        title: '首页'
    })
}

// admin post book
exports.save = function(req, res) {
    console.log(req.body.cart);
    var bookId = req.body.cart.book
    var userId = req.body.cart.user
    var _cart

    if (userId) {
        Cart.find({}, function (err, cart) {
            console.log(cart);
            console.log(cart.bookList);
            // cart.bookList.push(bookId)

            res.redirect('/cart')
        })
    } else {
        var cart = new Cart({
            user: userId,
            bookList: {book: bookId}
        })

        cart.save(function(err,cart) {
        if(err) {
            console.log(err);
        }
        res.redirect('/cart')
        })
    }
    
}