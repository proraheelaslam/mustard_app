const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer  = require('multer');
const mailService = require('../utils/mail');


//

const register = async (req,res)=> {

    try {

        const schema = Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            confirm_password:Joi.string().required().valid(Joi.ref('match')),
        });
        const { error } = schema.validate(req.body);

        if(error) {
            res.send(validationResponse(error.message));
        }else {

            let userResponse = {};
            let email  = req.body.email;


            let resUser = await User.findOne({
                where: {
                    email: email
                }
            });

            if(resUser) {

                userResponse = successResponse('You has already register',resUser);
            }else {
                let ob = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email:req.body.email,
                    password:req.body.password,
                    photo:'',
                };
                console.log(ob);
                let res = await User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email:req.body.email,
                    password:req.body.password,
                    photo:'',
                });
                userResponse = successResponse('You has been register successfully',res);
            }
            return res.send(userResponse);
        }

    }catch (e) {
        return res.send(errorResponse());
    }
};

const sendCode = async (req,res) => {


   /* let info = await mailService.mailConfig.sendMail({
        from: 'raheelaslam1136@gmail.com', // sender address
        to: "raheelaslam1136@gmail.com", // list of receivers
        subject: "Hello",
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
*/
    const schema = Joi.object().keys({
        email: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if(error) {
        res.send(validationResponse(error.message));
    }else {
        let userResponse = successResponse('Code has been sent at your email please check',{code: Math.random().toString(36).substring(7)});
        return res.send(userResponse);
    }
    console.log("Message sent: %s", info.messageId);
};
let user = {};
user.register = register;
user.sendCode = sendCode;


module.exports  = user;