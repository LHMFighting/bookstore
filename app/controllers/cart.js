var Book = require('../models/book')
var Cart = require('../models/shopping_cart')
var _ = require('underscore')

// index page
exports.list = function (req, res) {

    if (req.session.user) {
      var userId = req.session.user._id
      Cart.find({user:userId}, function(err, docs){
        if (docs.length === 0) {
          bookList = []
        } else {
          bookList = docs[0].bookList
        }

        if (err) {
          console.log(err);
        }
        res.render('cart', {
          title: '首页',
          bookList: bookList
        })
      })
    }
}

// admin post book
exports.save = function(req, res) {
    var bookId = req.body.cart.book

    if (!req.session.user) {

        res.redirect('/signin')
    } else {
        var userId = req.session.user._id
        Cart.find({user:userId}, function(err, docs){
            if (docs.length) {
                console.log('有记录，更新记录里的数组');
                Cart.update({user:userId}, {$push: {bookList: {book:bookId, bookNums:1}}}, function(err, docs) {
                  if (err) {
                    console.log(err);
                  }
                  res.redirect('/cart')
                })
            } else {
                console.log('没有记录，添加一条记录');
                var cart = new Cart({
                    user: userId,
                    bookList: [
                      {
                        book:bookId,
                        bookNums: 1
                      }
                    ]
                })

                cart.save(function(err,cart) {
                  if(err) {
                      console.log(err);
                  }
                  res.redirect('/cart')
                })
           }
       })

    }
    
}