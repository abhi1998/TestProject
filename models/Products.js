const mongoose = require('mongoose');

var productScehma = new mongoose.Schema({
    name: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('products', productScehma);