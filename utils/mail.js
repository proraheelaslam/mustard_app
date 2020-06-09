const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'raheelaslam1136@gmail.com', // generated ethereal user
        pass: 'ADmin&&10', // generated ethereal password
    },
});
let mailServiceObj = {};
mailServiceObj.mailConfig = transporter;
module.exports  = mailServiceObj;
