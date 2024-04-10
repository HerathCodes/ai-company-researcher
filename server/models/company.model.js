const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    Name:{
        type: String,
        required: true,
        unique: true
    },
    Summary: {
        type: String,
        required: true
    },
    Rating: {
        type: Number
    },
    Site: {
        type: String,
        required: true
    },
    Articles:[{
        type:Schema.Types.ObjectId, ref: 'Article'
    }]
}, {timestamps:true});

module.exports = mongoose.model('Company', companySchema);