const mongoose = require('mongoose');

var categoryScehma = new mongoose.Schema({
    category: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('categories', categoryScehma);