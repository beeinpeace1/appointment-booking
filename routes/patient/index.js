const express = require('express');
const routes = express.Router();
const nodemailer = require('nodemailer');
const db = require('./../../helpers/db');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'resistancet9@gmail.com',
        pass: 'pe@cheS9122'
    }
});

// root route for this file is /patient

routes.get('/', (req, res, next) => {
    db.query('select * from departments', (err, data) => {
        if(err) {
            throw err;
        }
        
        res.render('patient/index', {
            // we need to only keys of the object. we get dept in keys so
            dept: data,
        });
    })
});

routes.get('/getdocs', (req, res, next) => {
    // get Dept name as query string and access doctors from dept_doctors object and respond with docs.
    db.query(`select * from doctors where dept_id in 
    (select id from departments where dept_name="${req.query.qd}")`, (err, data) => {
        res.json(data);
    })
});

// executes when user fills form and submits it.
routes.post('/submit', (req, res, next) => {
    const docName = req.body.docs.split("___")[0];
    const docID = req.body.docs.split("___")[1];
    req.session.userdataModified = Object.assign({}, req.body, {docsID: docID, docs: docName});
    
    console.log(req.session.userdataModified);
    res.render('patient/confirm', {
        details: req.session.userdataModified
    });
});

// executes when user cofirms the form filled.
routes.get('/confirm', (req, res, next) => {

    // send mail to patient mail address
    const userData = req.session.userdataModified;

    const mailOptions = {
        from: 'Naveen N',
        to: 'beeinpeace@gmail.com',
        subject: 'Details of Appointment',
        html: `<div style="font-size: 1.6em;">
        <h3> Doctor Details </h3>
        <span>
        <strong>Doctor Name:</strong>
        ${userData.docs || ''}
    </span>
    <br>
    <span>
        <strong>Department:</strong>
        ${userData.dept || ''}
    </span>
    <br>
    <span>
        <strong>Time:</strong>
        ${userData.time || ''}
    </span>
    <br>
    <span>
        <strong>Date:</strong>
        ${userData.date || ''}
    </span>
    <br>
    <hr>
    <h3> Patient Details </h3>
    <span>
    <strong>Name:</strong>
    ${userData.fname || ''}
        ${userData.lname || ''}
</span>
<br>
<span>
    <strong>Phone:</strong>
    ${userData.phone || ''}
</span>
<br>
<span>
    <strong>Email:</strong>
    ${userData.email || ''}
</span>
<br>
<span>
    <strong>Address:</strong>
    ${userData.address || ''}
</span>
<br>
<span>
    <strong>City:</strong>
    ${userData.city || ''}
</span>
<br>
<span>
    <strong>Zipcode:</strong>
    ${userData.zip || ''}
</span>
<br>
<span>
    <strong>Note:</strong>
    ${userData.note || ''}
</span>
</div>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            res.render('patient/confirmed', {
                message: "Details of Appointment has been sent you on your mail."
            });
    });
});

module.exports = routes;