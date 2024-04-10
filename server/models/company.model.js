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
    Site: {
        type: String,
        required: true
    },
    Links:{
        type: [String]
    }
}, {timestamps:true});

module.exports = mongoose.model('Company', companySchema);