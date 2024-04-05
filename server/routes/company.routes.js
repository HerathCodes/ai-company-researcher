const express = require('express');
const {
    getCompanies,
    getCompany,
    createCompany,
    deleteCompany
} = require('../controllers/company.controller')

const router  = express.Router()

//GET all companies
router.get('/', getCompanies);

//GET single company
router.get('/:id', getCompany);

// POST a new company
router.post('/', createCompany);

// DELETE a new company
router.delete('/:id', deleteCompany);



module.exports = router