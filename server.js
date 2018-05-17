const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const index = require('./routes/index');
const admin = require('./routes/admin/index');
const doctor = require('./routes/doctor/index');
const patient = require('./routes/patient/index');

// setup Static files folder to serve
app.use(express.static('public'));

// POST setup
app.use(bodyParser.json());

// set view engine to EJS
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/admin', admin);
app.use('/doctor', doctor);
app.use('/patient', patient);

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});