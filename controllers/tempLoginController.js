const Joi = require('@hapi/joi');
const TempLogin = require('../models/TempLogin');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const mailService = require('../utils/mail');
const secretToken = 'mustaredapp';
const jwt = require('jsonwebtoken');
const { getCurrentUserInfo } = require('../utils/Helpers');

const sendInvitation = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            Email: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let userResponse = {};
            const Email = req.body.Email;
            let resUser = await TempLogin.findOne({
                where: {
                    Email: Email
                }
            });
            if (resUser) {
                let userdata = JSON.parse(JSON.stringify(resUser));
                const stringdata = JSON.stringify(resUser);
                const accessToken = jwt.sign({ username: stringdata, role: 'pending' }, secretToken);
                const customrespons = {
                    Is_Already_Exists: true,
                    Token: accessToken
                }
                TempLogin.update({ Email: Email }, { where: { ID: resUser.id }, returning: true });
                userResponse = successResponse('Invitation Link is sent to your email address', customrespons);
            } else {
                let res = await TempLogin.create(req.body);
                const stringdata = JSON.stringify(res);
                const accessToken = jwt.sign({ username: stringdata, role: 'pending' }, secretToken);
                const customrespons = {
                    Is_Already_Exists: false,
                    Token: accessToken,
                }
                userResponse = successResponse('Invitation Link is sent to your email address', customrespons);
            }
            return res.send(userResponse);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};


const sendDeepLink = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            Deep_Link: Joi.any().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let Response = {};
            const userinfo = getCurrentUserInfo(req);
            console.log('getCurrentUserInfo', userinfo);
            if (userinfo.role == 'guest') {
                var msg = { status: false, message: 'You are not allowed to performed specifiec action' };
                return res.status(401).send(msg);
            }

            let info = await mailService.mailConfig.sendMail({
                from: 'mukhtiarfsd@gmail.com', // sender address
                to: userinfo.Email, // list of receivers
                subject: "MustaredApp Account",
                // text: "Hello world?", // plain text body
                html: req.body.Deep_Link, // html body
            });

            if (info) {
                Response = successResponse('Link is sent to your email address', true);
            } else {
                Response = successResponse('Opps some error', false);
            }
            return res.send(Response);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

let tmpLogin = {};
tmpLogin.sendInvitation = sendInvitation;
tmpLogin.resendInvitation = sendInvitation;
tmpLogin.sendDeepLink = sendDeepLink;
module.exports = tmpLogin;