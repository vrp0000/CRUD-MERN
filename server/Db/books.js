const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    author: {
        type: String,
        requried: false
    },
    price: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    image: {
        data: Buffer,
        contentType: String,
        required: false
    }
})

mongoose.model("Books", bookSchema)