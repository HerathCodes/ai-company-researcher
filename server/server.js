const http = require('http');

const express = require('express');

const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();


const companyRoutes = require('./routes/companies');
const User = require('./models/user.model');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status : 200});
    } catch (error) {
        console.error(error);
        res.json({ status: 409, error: 'Error: Account with that email already exists.'})
    }
});

app.post('/api/login', async (req, res) => {
    
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign(
            {
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        return res.json({status: 200, user:token});
    } else {
        return res.json({status: 401, user:false});

    }
});

app.use('/api/companies',companyRoutes);


mongoose.connect(process.env.DB_CONN_STRING)
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