const express = require('express');
const routes = express.Router();

// root route for this file is /doctor

routes.get('/', (req, res, next) => {
    res.send("from doctor index");
});

module.exports = routes;