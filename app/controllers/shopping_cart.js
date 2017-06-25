var Book = require('../models/book')

// index page
exports.index = function (req, res) {
    Category
        .find({})
        .populate({
            path: 'books',
            options: {
                limit: 5
            }
        })
        .exec(function (err, categories) {
            if (err) {
                console.log(err)
            }
            res.render('index', {
                title: '首页',
                categories: categories
            })
        })
}

// admin post book
exports.save = function(req, res) {
    var id = req.body.book._id
    var bookObj = req.body.book
    var _book
    console.log('object');
    console.log(id);
    console.log(bookObj);
    if(id)  {
        Book.findById(id, function(err, book) {
            if (err) {
                console.log(err)
            }
            _book = _.extend(book, bookObj)
            _book.save(function(err,book) {
                if(err) {
                    console.log(err)
                }
                res.redirect('/admin/book/list')
            })
        })
    } else {
        _book = new Book(bookObj)
        var categoryId = bookObj.category
        var categoryName = bookObj.categoryName
        _book.save(function(err,book){
            if(err) {
                console.log(err)
            }
            if(categoryId) {
                Category.findById(categoryId, function (err, category) {
                    category.books.push(book._id)

                    category.save(function(err,category) {
                        res.redirect('/admin/book/list')
                    })
                })
            } else if(categoryName){
                var category = new Category({
                    name: categoryName,
                    books: [book._id]
                })

                category.save(function(err,category) {
                    book.category = category._id
                    book.save(function(err,book) {
                        res.redirect('/admin/book/list')
                    })
                })
            }
        })
    }
}