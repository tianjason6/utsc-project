const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

const config = require('./config');

const email = config.email;
const pass = config.password;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

exports.sendmail = functions.https.onRequest((req, res)=> {
    console.log(req.body);
    cors(req, res, () => {
        const msg = {
            from: email,
            to: 'r.hong@pm.me',
            subject: "Contact-us Email Submission From: " + req.body.firstName + " " +  req.body.lastName 
            + " Year: " + req.body.yearOfStudy,
            text: "Sender: " + req.body.email + "\n"
            + "Message: " + req.body.message
        }
        return transporter.sendMail(msg, (error, info) => {
            if(error){
                return res.send(error.toString());
            }
            return res.send('Email Sent:' + info.response);
        })
    })
});