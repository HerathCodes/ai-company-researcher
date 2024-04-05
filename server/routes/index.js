const express = require('express');
const companyRoutes = require('./company.routes');
const userRoutes = require('./user.routes');
const router = express.Router();

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);

module.exports = router;