const express = require('express');
const Company = require('../modles/companyModel');

const router  = express.Router()

//GET all companies
router.get('/', (req, res) => {
    res.json({msg: "Get all companies"});
});

//GET single company
router.get('/:id', (req,res) =>{
    res.json({msg: "Get single company" + req.body});
});

// POST a new company
router.post('/', async (req, res) =>{
    const {Name, Office, Summary, Positions, Salary, Links} = req.body;

    try{
        const company = await Company.create({Name, Office, Summary, Positions, Salary, Links});
        res.status(200).json(company);
    }catch (err){
        res.status(404).json({error: err.message});
    }


    res.json({msg: "POST single company"});
});

// DELETE a new company
router.delete('/:id', (req, res) =>{
    res.json({msg: "DELETE single company"});
});



module.exports = router