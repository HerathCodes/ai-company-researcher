const express = require('express');
const {
    getUsers,
    getUser,
    registerUser,
    loginUser
} = require('../controllers/user.controller');

const router = express.Router();

//GET all users
router.get('/', getUsers);

//GET single user
router.get('/:id', getUser);

// POST a new user
router.post('/register', registerUser);

// AUTHENTICATE a user
router.post('/login', loginUser);

module.exports = router;