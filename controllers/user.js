const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const mailService = require('../utils/mail');

//

const register = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            console.log('fff3');
            res.send(validationResponse(error.message));
        } else {
            let userResponse = {};
            let email = req.body.email;
            let resUser = await User.findOne({
                where: {
                    email: email
                }
            });
          
            if (resUser) {
                userResponse = successResponse('You has already register', resUser);
            } else {
                const data = {
                    ...req.body
                }
                let res = await User.create(data);
                userResponse = successResponse('You has been register successfully', res);
            }
            return res.send(userResponse);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};


let userController = {};
userController.register = register;
module.exports = userController;