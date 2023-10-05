const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const users = require('./Routes/users');
const appoint=require('./Routes/appoint')
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());
app.use('/users', users);
app.use('/appoint',appoint);
module.exports = app;
