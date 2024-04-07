const express = require('express');
const {
    getCompanies,
    getLikeCompanies,
    getCompany,
    createCompany,
    deleteCompany
} = require('../controllers/company.controller')

const router  = express.Router()

//GET all companies
router.get('/', getCompanies);

//GET like companies
router.get('/search/:query', getLikeCompanies)

//GET single company
router.get('/:name', getCompany);

// POST a new company
router.post('/', createCompany);

// DELETE a company
router.delete('/:id', deleteCompany);



module.exports = router