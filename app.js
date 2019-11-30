const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const userRoutes = require('./api/routes/users');

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;