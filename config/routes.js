var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Book = require('../app/controllers/book')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')
var Cart = require('../app/controllers/cart')

module.exports = function(app) {

    // pre handle user
    app.use(function(req,res,next) {
        var _user = req.session.user
        app.locals.user = _user
        return next()
    })

    // Index 
    app.get('/', Index.index) 

    // User
    app.post('/user/signup', User.signup) 
    app.post('/user/signin', User.signin)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/logout', User.logout)
    app.get('/admin/user/list',User.signinRequired, User.adminRequired, User.list)

    // detail page
    app.get('/book/:id', Book.detail)
    app.get('/admin/book/new',User.signinRequired, User.adminRequired, Book.new)
    app.get('/admin/book/update/:id',User.signinRequired, User.adminRequired, Book.update)
    app.post('/admin/book/new',User.signinRequired, User.adminRequired, Book.save)
    app.get('/admin/book/list', User.signinRequired, User.adminRequired,Book.list)
    app.delete('/admin/book/list', User.signinRequired, User.adminRequired,Book.del)

    // Comment
    app.post('/user/comment', User.signinRequired, Comment.save)

    // Category
    app.get('/admin/category/new', User.signinRequired, User.adminRequired,Category.new)
    app.post('/admin/category',User.signinRequired, User.adminRequired, Category.save)
    app.get('/admin/category/list', User.signinRequired, User.adminRequired,Category.list)

    // results
    app.get('/results', Index.search)

    // shopping cart
    app.get('/cart', Cart.list)
    app.post('/cart/save', Cart.save)
}
