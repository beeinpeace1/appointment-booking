const express = require('express');
const routes = express.Router();

// root route for this file is /admin

routes.get('/', (req, res, next) => {
    res.render('admin/index')
});

module.exports = routes;