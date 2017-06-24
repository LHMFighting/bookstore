var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var bookSchema = Schema({
    title: String,
    author: String,
    pubdate: String,
    publisher: String,
    pages: String,
    poster: String,
    author_intro: String,
    price: String,
    summary: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    },
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

bookSchema.pre('save', function(next){
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

// 静态方法，取出目前数据库所有数据
bookSchema.statics = {
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

module.exports = bookSchema