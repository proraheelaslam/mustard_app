const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "techincubator.co",
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'mustard@techincubator.co', // generated ethereal user
        pass: ']to_G,(#VwB(', // generated ethereal password
    },
});
let mailServiceObj = {};
mailServiceObj.mailConfig = transporter;
module.exports = mailServiceObj;
