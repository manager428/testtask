const mongoose = require('mongoose');
require('dotenv').config();


const baseUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(baseUrl, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log('DB connected!')
;});

mongoose.connection.on('error', err => {
    console.log('Error occurred!', err);
});

require('./dbSchema');