var Book = require('../models/book')
var Category = require('../models/category')
var Book = require('../models/book')

// index page
exports.index = function (req, res) {
     Book.find({}, function(err, book) {
                console.log(book._id);
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
                    categories: categories,
                    book: book
                })
            })
    })
}

// search page
exports.search = function (req, res) {
    var catId = req.query.cat
    var q = req.query.q
    var page = parseInt(req.query.p,10) || 0
    var count = 12
    var index = page * count
    if(catId) {
       
        Category
            .find({_id: catId})
            .populate({
                path: 'books',
                select: 'title poster'
                // options: {     // mongosse的skip有问题
                //     limit: 2,
                //     skip:index
                // }
            })
            .exec(function (err, categories) {
                if (err) {
                    console.log(err)
                }
                var category = categories[0] || {}
                var books = category.books || []
                var results = books.slice(index, index + count)

                res.render('results', {
                    title: '结果列表页面',
                    keyword: category.name,
                    currentPage: (page + 1),
                    query: 'cat=' + catId,
                    totalPage: Math.ceil(books.length/count),
                    books: results
                })
            })
    } else {
        Book
            .find({title: new RegExp(q + '.*', 'i')})
            .exec(function(err,books) {
                if (err) {
                    console.log(err)
                }
                var results = books.slice(index, index + count)
                res.render('results', {
                    title: '结果列表页面',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(books.length/count),
                    books: results
                })
            })
    }
}