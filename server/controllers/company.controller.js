const Company = require('../models/company.model');
const mongoose = require('mongoose')



//GET all companies
const getCompanies = async(req,res) =>{
    const companies = await Company.find({}).sort({createdAt: -1});
    res.status(200).json(companies);
}

//GET a single company
const getCompany = async(req,res) =>{

    const company = await Company.findOne({
        Name: req.body.name
    });

    if(!company){
        return res.status(400).json({error: "No such company"});
    }
    res.status(200).json(company);
}



// POST a new company
const createCompany = async(req, res) => {
    const {Name, Office, Summary, Positions, Salary, Links} = req.body;

    try{
        const company = await Company.create({Name, Office, Summary, Positions, Salary, Links});
        res.status(200).json(company);
    } catch (err){
        res.status(404).json({error: err.message});
    }
}


// DELETE a new company
const deleteCompany = async(req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such company"});
    }

    const company = await Company.findOneAndDelete({_id: id});

    if(!company){
        return res.status(400).json({error: "No such company"});
    }
    res.status(200).json(company);
}

module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    deleteCompany
}
