const express = require('express');
const {
    getCompanies,
    getLikeCompanies,
    scrapeCompany,
    getCompany,
    createCompany,
    deleteCompany
} = require('../controllers/company.controller')

const router  = express.Router()

//GET all companies
router.get('/', getCompanies);

// POST a new company
router.post('/', createCompany);

//GET single company
router.get('/:name', getCompany);

// DELETE a company
router.delete('/:id', deleteCompany);

//GET like companies
router.get('/search/:query', getLikeCompanies);

//POST scraped company info
router.post('/scrape/', scrapeCompany);






module.exports = router