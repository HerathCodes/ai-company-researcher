const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
    res.json({status : 200});
    console.log(req.body);
});

app.get('/', (req, res) => {
    res.send('Hello World')
});



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