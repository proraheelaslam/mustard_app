const Joi = require('@hapi/joi');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');

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
            same_gender: Joi.any().optional()
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

const show = async (req, res) => {
    try {
        console.log('user_id', req.params.id)
        let res = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        let result;
        if (res) {
            result = successResponse('The specified action performed', res);
        } else {
            result = notFoundResponse('Invalid Id');
        }

        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const update = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            email: Joi.string().optional(),
            birth_place_id: Joi.string().optional(),
            employment_id: Joi.string().optional(),
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
            same_gender: Joi.any().optional()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            const id = req.params.id;
            let res = await User.update(req.body, { where: { id: id }, returning: true });
            let response = successResponse('Data has been created successfully', res);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

let userController = {};
userController.show = show;
userController.update = update;
userController.register = register;
module.exports = userController;