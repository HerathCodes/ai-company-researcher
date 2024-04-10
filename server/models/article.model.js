const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Link: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);