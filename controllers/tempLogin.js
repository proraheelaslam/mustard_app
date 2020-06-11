const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const TempLogin = require('../models/TempLogin');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const mailService = require('../utils/mail');



const sendInvitation = async (req, res) => {

    /* let info = await mailService.mailConfig.sendMail({
         from: 'raheelaslam1136@gmail.com', // sender address
         to: "raheelaslam1136@gmail.com", // list of receivers
         subject: "Hello",
         text: "Hello world?", // plain text body
         html: "<b>Hello world?</b>", // html body
     });
 */
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let userResponse = {};
            let resUser = await TempLogin.findOne({
                where: {
                    Email: req.body.email
                }
            });
            let tmpCode = Math.random().toString(36).substring(7);
            let emailLink =  constants.APP_URL + '/' + tmpCode;
            if (resUser) {


                TempLogin.update({ phone_otp: tmpCode, email_link: emailLink }, { where: { id: resUser.id }, returning: true });
                userResponse = successResponse('Invitation Link is sent to your email address', { code: tmpCode });
            } else {
                let tmpCode = Math.random().toString(36).substring(7);
                let res = await TempLogin.create({
                    Email_Link: emailLink,
                    Email: req.body.email,
                    Phone_OTP: tmpCode,
                    Phone_number: '',
                    Phone_Status: 0,
                    Email_status: 0,
                });
                userResponse = successResponse('You has been register successfully', res);
            }
            return res.send(userResponse);
        }

    } catch (e) {
        return res.send(errorResponse());
    }
};


let tmpLogin = {};
tmpLogin.sendInvitation = sendInvitation;
tmpLogin.resendInvitation = sendInvitation;
module.exports = tmpLogin;