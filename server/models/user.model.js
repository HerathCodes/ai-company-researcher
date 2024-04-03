const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: { 
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'guest',
            required: true
        }
    },
    { timestamps: true}
)

const model = mongoose.model('User', User, 'users');

module.exports = model;