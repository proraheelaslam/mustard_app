const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const TempLogin = require('../models/TempLogin');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const mailService = require('../utils/mail');



const sendCode = async (req, res) => {

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
                    email: req.body.email
                }
            });
            if (resUser) {
                let tmpCode = Math.random().toString(36).substring(7);
                TempLogin.update({ phone_otp: tmpCode, email_link: constants.APP_URL + '/' + tmpCode }, { where: { id: resUser.id }, returning: true });
                userResponse = successResponse('Invitation Link is sent to your email address', { code: tmpCode });
            } else {
                let tmpCode = Math.random().toString(36).substring(7);
                let res = await TempLogin.create({
                    email_link: req.body.tmpCode,
                    email: req.body.email,
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
tmpLogin.sendCode = sendCode;
module.exports = tmpLogin;