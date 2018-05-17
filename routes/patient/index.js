const express = require('express');
const routes = express.Router();

// root route for this file is /patient

routes.get('/', (req, res, next) => {
    res.send("from patient index");
});

module.exports = routes;