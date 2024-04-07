const Company = require('../models/company.model');
const mongoose = require('mongoose')



//GET all companies
const getCompanies = async(req,res) =>{
    const companies = await Company.find({}).sort({createdAt: -1});
    res.status(200).json(companies);
}

//GET similar companies
const getLikeCompanies = async (req, res) => {
    try {
        const { query } = req.params;
        const likeCompanies = await Company.find({ "Name": { $regex: query, $options: 'i' } });
        if (likeCompanies.length === 0) {
            return res.status(400).json({ error: "No similar companies" });
        }
        return res.status(200).json(likeCompanies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
};

//GET a single company
const getCompany = async (req, res) => {
    try {
        const { name } = req.params;
        const company = await Company.findOne({ Name: name });
        if (!company) {
            return res.status(400).json({ error: "No such company" });
        }
        return res.status(200).json(company);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
};


// POST a new company
const createCompany = async(req, res) => {
    const { Name, Office, Summary, Positions, Salary, Links } = req.body;

    try{
        const company = await Company.create({ Name, Office, Summary, Positions, Salary, Links });
        res.status(200).json(company);
    } catch (err){
        res.status(404).json({error: err.message});
    }
}


// DELETE a new company
const deleteCompany = async(req, res) =>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Database Error"});
    }

    const company = await Company.findOneAndDelete({_id: id});

    if(!company){
        return res.status(400).json({error: "No such company"});
    }
    res.status(200).json(company);
}

module.exports = {
    getCompanies,
    getLikeCompanies,
    getCompany,
    createCompany,
    deleteCompany
}
