const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const api = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', api);

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