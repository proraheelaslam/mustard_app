const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const TempLogin = require('../models/TempLogin');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const mailService = require('../utils/mail');



const sendInvitation = async (req, res) => {

    // let info = await mailService.mailConfig.sendMail({
    //     from: 'mustard@techincubator.co', // sender address
    //     to: "mukhtiarfsd@gmail.com", // list of receivers
    //     subject: "Hello",
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });

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
            let tmpCode = Math.random().toString(36).substring(7);
            // let emailLink = constants.APP_URL + '/' + tmpCode;
            if (resUser) {
                const customrespons = {
                    code: tmpCode,
                    isAlreadyExists: true
                }
                TempLogin.update({ email_link: tmpCode, email: req.body.email }, { where: { id: resUser.id }, returning: true });
                userResponse = successResponse('Invitation Link is sent to your email address', customrespons);
            } else {
                req.body['email_link'] = tmpCode;
                let res = await TempLogin.create(req.body);
                const customrespons = {
                    code: tmpCode,
                    isAlreadyExists: false
                }
                userResponse = successResponse('Invitation Link is sent to your email address', customrespons);
            }
            return res.send(userResponse);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};


let tmpLogin = {};
tmpLogin.sendInvitation = sendInvitation;
tmpLogin.resendInvitation = sendInvitation;
module.exports = tmpLogin;