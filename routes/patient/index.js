const express = require('express');
const routes = express.Router();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'resistancet9@gmail.com',
        pass: 'pe@cheS9122'
    }
});

// root route for this file is /patient

var dept_doctors = {
    "Dermatologist": ["Henry", "Katie", "Micha", "Jeol"],
    "Cardiologist": ["Henry", "Katie", "Alex"],
    "Pathologists": ["Jason", "Mary", "Benny", "Mala"]
};

routes.get('/', (req, res, next) => {
    res.render('patient/index', {
        // we need to only keys of the object. we get dept in keys so
        dept: Object.keys(dept_doctors),
    });
});

routes.get('/getdocs', (req, res, next) => {
    // get Dept name as query string and access doctors from dept_doctors object and respond with docs.
    res.json(dept_doctors[req.query.qd]);
});

// executes when user fills form and submits it.
routes.post('/submit', (req, res, next) => {
    req.session.userdata = req.body;
    res.render('patient/confirm', {
        details: req.body
    });
});

// executes when user cofirms the form filled.
routes.get('/confirm', (req, res, next) => {

    // send mail to patient mail address
    const userData = req.session.userdata;

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