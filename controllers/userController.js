const Joi = require('@hapi/joi');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { getCurrentUserInfo } = require('../utils/Helpers');
const accessTokenSecret = 'youraccesstokensecret';
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            email: Joi.string().optional(),
            gender: Joi.any().optional(),
            birth_place_id: Joi.number().optional(),
            employment_id: Joi.number().optional(),
            user_name: Joi.any().optional(),
            phone_number: Joi.any().optional(),
            bank_id: Joi.any().optional(),
            credit_report_path: Joi.any().optional(),
            linkedin: Joi.any().optional(),
            facebook: Joi.any().optional(),
            instagram: Joi.any().optional(),
            snapchat: Joi.any().optional(),
            dob: Joi.any().optional(),
            profile_image: Joi.any().optional(),
            latitude: Joi.any().optional(),
            longitude: Joi.any().optional(),
            home_address: Joi.any().optional(),
            Office_school_address: Joi.any().optional(),
            other_address: Joi.any().optional(),
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
                let res = await User.create(req.body);
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
            gender: Joi.any().optional(),
            birth_place_id: Joi.number().optional(),
            employment_id: Joi.number().optional(),
            user_name: Joi.any().optional(),
            phone_number: Joi.any().optional(),
            bank_id: Joi.any().optional(),
            credit_report_path: Joi.any().optional(),
            linkedin: Joi.any().optional(),
            facebook: Joi.any().optional(),
            instagram: Joi.any().optional(),
            snapchat: Joi.any().optional(),
            dob: Joi.any().optional(),
            profile_image: Joi.any().optional(),
            latitude: Joi.any().optional(),
            longitude: Joi.any().optional(),
            home_address: Joi.any().optional(),
            Office_school_address: Joi.any().optional(),
            other_address: Joi.any().optional(),
            annonymus_status: Joi.any().optional(),
            same_gender: Joi.any().optional()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            const id = req.params.id;
            let res = await User.update(req.body, { where: { id: id }, returning: true });
            let response = successResponse('Data has been updated successfully', true);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const accessToken = jwt.sign({ username: 'test', role: 'admin' }, accessTokenSecret);
        let result;
        if (accessToken) {
            result = successResponse('The specified action performed', accessToken);
        } else {
            result = notFoundResponse('Invalid Usernae or password');
        }

        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const currentUser = async (req, res) => {
    try {
        const userinfo = getCurrentUserInfo(req);
        console.log('userinfo', userinfo);
        let res = await User.findOne({
            // where: {
            //     id: req.params.id
            // }
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

let userController = {};
userController.show = show;
userController.currentUser = currentUser;
userController.login = login;
userController.update = update;
userController.register = register;
module.exports = userController;