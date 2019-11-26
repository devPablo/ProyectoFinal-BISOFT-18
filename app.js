const express = require('express');
const path = require('path');
const app = express();

const userRoutes = require('./api/routes/users');

app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;