const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'mukhtiarfsd@gmail.com', // generated ethereal user
        pass: 'bkppiizwirgrwldn', // generated ethereal password
    },
});
let mailServiceObj = {};
mailServiceObj.mailConfig = transporter;
module.exports = mailServiceObj;
