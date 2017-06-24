var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ShoppingCartSchema = new Schema({
    user: {type: ObjectId, ref: 'users'},
    bookList: [{
        book: {type: ObjectId, ref: 'books'},
        bookNums: {
            type: Number,
            default: 0
        }
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

ShoppingCartSchema.pre('save', function(next){
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

// 静态方法，取出目前数据库所有数据
ShoppingCartSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id,cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = ShoppingCartSchema