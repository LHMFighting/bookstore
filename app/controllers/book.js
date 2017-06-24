var Book = require('../models/book')
var Category = require('../models/category')
var Comment = require('../models/comment')
var _ = require('underscore')

// detail page
exports.detail = function (req, res) {
    var id = req.params.id
    Book.findById(id,function(err,book) {
        Comment
            .find({book: id})
            .populate('from','name')
            .populate('reply.from reply.to', 'name')
            .exec(function(err,comments) {
                if(err) {
                    console.log(err)
                }
                console.log(book.summary);
                book.summary.replace(/\r\n/g, '<br>')
                console.log(book.summary);
                console.log(book);
                res.render('detail', {
                    title:  book.title,
                    book: book,
                    comments: comments
                })
            })
    })
}

// admin new page
exports.new = function(req, res) {
    Category.find({}, function(err, categories) {

        res.render('admin', {
            title: '后台录入页',
            categories: categories,
            book: {}
        })
    })
}


// admin update page
exports.update = function(req, res) {

    var id = req.params.id

    if (id) {
        Book.findById(id, function(err, book) {
            Category.find({}, function(err, categories) {
                if (err) {
                    console.log(err)
                }
                res.render('admin', {
                    title: '后台更新页',
                    book: book,
                    categories: categories
                })
            })
        })
    }
}

// admin post book
exports.save = function(req, res) {
    var id = req.body.book._id
    var bookObj = req.body.book
    var _book
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

// list page
exports.list = function(req, res) {
    Book.fetch(function(err, books) {
        if(err) {
            console.log(err)
        }
        res.render('list', {
            title: '列表页',
            books: books
        })
    })
}

// list delete book
exports.del = function(req, res) {
    var id = req.query.id
    console.log(id)
    if (id) {
        Book.remove({_id: id}, function(err,book) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
}