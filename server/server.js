const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/companies');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/companies',companyRoutes);


mongoose.connect("mongodb+srv://admin:qYmTIesSWXqh4Dg2@researchdb.orfjsuq.mongodb.net/ai-company-researcher?retryWrites=true&w=majority&appName=researchDB")
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, err => {
        if (err) {
            console.error(err)
        } else {
            console.log(`Server is running on port ${PORT}`)
        }
    })
})
.catch(err => {
    console.error(err);
});