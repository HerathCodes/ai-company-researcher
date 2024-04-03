const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    Office: {
        type: String,
    },
    Summary: {
        type: String,
        required: true
    },
    Positions:{
        type:String[{}]
    },
    Salary:{
        type: Number
    },
    Links:{
        type: String[{}]
    }
}, {timestamps:true});

module.exports = mongoose.model('Company', companySchema);