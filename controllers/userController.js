const Joi = require('@hapi/joi');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { getCurrentUserInfo } = require('../utils/Helpers');
const secretToken = 'mustaredapp';
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
            const userinfo = getCurrentUserInfo(req);
            console.log('usernameusername', userinfo.username);
            let res = await User.findOne({
                where: {
                    email: userinfo.username
                }
            });
            let result;
            if (res) {
                let userdata = JSON.parse(JSON.stringify(res));
                const accessToken = jwt.sign({ username: userdata.id, role: 'admin' }, secretToken);
                userdata['token'] = accessToken;
                result = successResponse('You has been already register', userdata);
            } else {
                let userData = req.body;
                userData['email'] = userinfo.username;
                let resobj = await User.create(req.body);
                let userdataObj = JSON.parse(JSON.stringify(resobj));
                const accessToken = jwt.sign({ username: userdataObj.id, role: 'admin' }, secretToken);
                userdataObj['token'] = accessToken;
                result = successResponse('You has been register successfully', userdataObj);
            }
            return result;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const registerWithFb = async (req, res) => {
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
            same_gender: Joi.any().optional(),
            fb_id: Joi.any().required()
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await User.findOne({
                where: {
                    fb_id: req.body.fb_id
                }
            });
            let result;
            if (res) {
                let userdata = JSON.parse(JSON.stringify(res));
                const accessToken = jwt.sign({ username: userdata.id, role: 'admin' }, secretToken);
                userdata['token'] = accessToken;
                result = successResponse('You has been already register', userdata);
            } else {
                let resobj = await User.create(req.body);
                let userdataObj = JSON.parse(JSON.stringify(resobj));
                const accessToken = jwt.sign({ username: userdataObj.id, role: 'admin' }, secretToken);
                userdataObj['token'] = accessToken;
                result = successResponse('You has been register successfully', userdataObj);
            }
            return result;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const show = async (req, res) => {
    try {
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

const guestLogin = async (req, res) => {
    try {
        const accessToken = jwt.sign({ username: 'temp', role: 'guest' }, secretToken);
        let result;
        let data = {};
        data['token'] = accessToken
        if (accessToken) {
            result = successResponse('The specified action performed', data);
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
        let res = await User.findOne({
            where: {
                id: userinfo.username
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

let userController = {};
userController.show = show;
userController.currentUser = currentUser;
userController.registerWithFb = registerWithFb;
userController.guestLogin = guestLogin;
userController.update = update;
userController.register = register;
module.exports = userController;