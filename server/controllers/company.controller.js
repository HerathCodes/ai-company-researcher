const Company = require('../models/company.model');
const mongoose = require('mongoose')



//GET all companies
const getCompanies = async(req,res) =>{
    const companies = await Company.find({}).sort({Name: 'asc'});
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

// GET scraped company info
const scrapeCompany = async(req, res) => {
    try {
        const { Name, Site } = req.body;
        console.log(req.body);
        const q = 'About ' + Site;
        const response = await fetch(`https://serpapi.com/search?api_key=${process.env.SERP_API_KEY}&engine=google_about_this_result&async=true&q=${q}`);
        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            let sum = '';
            const Links = [];
            if (data.about_this_result.about_the_source.in_their_own_words) {
                const in_their_own_words = data.about_this_result.about_the_source.in_their_own_words;
                const snippet = in_their_own_words.snippet;
                const link = in_their_own_words.link;
                const startIndex = "In their own words".length;
                const endIndex = snippet.lastIndexOf("From") - 1;
                sum = snippet.slice(startIndex, endIndex);
                Links.push(link);
            } else if (data.about_this_result.about_the_source.description) {
                const description = data.about_this_result.about_the_source.description;
                const snippet = description.snippet;
                const link = description.link;
                const endIndex = snippet.lastIndexOf("From") - 1;
                sum = snippet.slice(0, endIndex);
                Links.push(link);
            } else {
                sum = `Unable to scrape summary on ${data.search_metadata.google_about_this_result_url}.`
            }
            const Summary = sum;
            const webResults = data.about_this_result.about_the_source.web_results_about_the_source;
            for (const result of webResults) {
                const link = result.link;
                Links.push(link);
            }
            return res.status(200).json({ Name, Site, Summary, Links });
        } else {
            console.error('Failed to scrape summary:', response.statusText);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "SERP GET ERROR" }); 
    }
}

//GET a single company
const getCompany = async (req, res) => {
    try {
        const { name } = req.params;
        const company = await Company.findOne({ Name: name });
        console.log(req.params);
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
    const { Name, Summary, Site, Links } = req.body;

    try{
        const company = await Company.create({Name, Summary, Site, Links });
        res.status(200).json(company);
    } catch (err){
        res.status(404).json({error: err.message});
    }
}


// DELETE a new company
const deleteCompany = async(req, res) =>{
    console.log(req.params);
    const { name } = req.params;

    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: "Database Error"});
    // }

    const company = await Company.findOneAndDelete({Name: name});

    if(!company){
        return res.status(400).json({error: "No such company"});
    }
    res.status(200).json(company);
}

module.exports = {
    getCompanies,
    getLikeCompanies,
    scrapeCompany,
    getCompany,
    createCompany,
    deleteCompany
}
