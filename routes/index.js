const express = require('express');
const routes = express.Router();

// root route for this file is /

routes.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = routes;