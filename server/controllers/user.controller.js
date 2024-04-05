const User = require('../models/user.model');
const mongoose = require('mongoose');

require('dotenv').config();
const jwt = require('jsonwebtoken');

//GET all users
const getUsers = async(req,res) =>{
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

//GET a single user
const getUser = async(req,res) =>{
    
    const {id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"});
    }

    const user = await User.findById(id);

    if(!user){
        return res.status(400).json({error: "No such user"});
    }

    res.status(200).json(user);
}

// POST a new user
const registerUser = async(req, res) => {
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
}

// POST a login user
const loginUser = async(req, res) => {

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
}

module.exports = {
    getUsers,
    getUser,
    registerUser,
    loginUser
}