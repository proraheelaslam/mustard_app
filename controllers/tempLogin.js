const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const TempLogin = require('../models/TempLogin');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer  = require('multer');
const mailService = require('../utils/mail');


//

const register = async (req,res)=> {

    try {

        const schema = Joi.object().keys({

            email: Joi.string().required(),
            phone_number: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if(error) {
            res.send(validationResponse(error.message));
        }else {

            let userResponse = {};
            let email  = req.body.email;

            let resUser = await TempLogin.findOne({
                where: {
                    email: email
                }
            });

            if(resUser) {
                userResponse = successResponse('You has already register',resUser);
            }else {

                let res = await TempLogin.create({
                    email:req.body.email,
                    phone_number:req.body.phone_number,
                    phone_otp:'',
                    email_link:'',
                    phone_status:0,
                    email_status:0,
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
    try {

        const schema = Joi.object().keys({

            phone_number: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if(error) {
            res.send(validationResponse(error.message));
        }else {

            let userResponse = {};

            let resUser = await TempLogin.findOne({
                where: {
                    phone_number:req.body.phone_number
                }
            });
            if(resUser) {
                let tmpCode = Math.random().toString(36).substring(7);
                TempLogin.update({phone_otp: tmpCode, email_link: constants.APP_URL+'/'+tmpCode}, { where:{ id: resUser.id } , returning:true  });
                userResponse = successResponse('You has login successfully',{ code: tmpCode });
            }else {
                //return {'c':0};
                userResponse =  notFoundResponse('phone number is invalid',{});
            }
            //console.log(userResponse);
            return res.send(userResponse);
        }

    }catch (e) {
        return res.send(errorResponse());
    }
};
let tmpLogin = {};
tmpLogin.register = register;
tmpLogin.sendCode = sendCode;


module.exports  = tmpLogin;