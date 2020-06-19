const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const mailService = require('../utils/mail');

const register = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string(),
            email: Joi.string().required(),
            birth_place_id: Joi.string().required(),
            employment_id: Joi.string().required(),
            user_name: Joi.any().optional(),
            phone_number: Joi.any().optional(),
            bankid: Joi.any().optional(),
            credit_report_path: Joi.any().optional(),
            linkedin: Joi.any().optional(),
            facebook: Joi.any().optional(),
            instagram: Joi.any().optional(),
            snapchat: Joi.any().optional(),
            dob: Joi.any().optional(),
            annonymus_status: Joi.any().optional(),
            same_gender: Joi.any().optional(),
            status: Joi.any().optional().default('1'),
        });
        const { error } = schema.validate(req.body);

        if (error) {
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
                userResponse = successResponse('You has been already register', resUser);
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

const update = async (req, res) => {
    try {
        let userResponse = {};
        let id = req.params.id;
        let resUser = await User.findOne({
            where: {
                id: id
            }
        });

        if (!resUser) {
            userResponse = notFoundResponse('No user found ', resUser);
        } else {
            let res = await User.update(req.body, { where: { id: id } });
            // const d = res[1][0].get();

            // let resUser = await User.findOne({
            //     where: {
            //         id: id
            //     }
            // });
            userResponse = successResponse('specified acction performed successfully', true);
        }
        return res.send(userResponse);

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

let userController = {};
userController.update = update;
userController.register = register;
module.exports = userController;