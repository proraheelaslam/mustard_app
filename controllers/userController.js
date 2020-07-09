const Joi = require('@hapi/joi');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { getCurrentUserInfo } = require('../utils/Helpers');
const secretToken = 'mustaredapp';
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
   // try {
        const schema = Joi.object().keys({
            First_Name: Joi.string().optional(),
            Last_Name: Joi.string().optional(),
            Email: Joi.string().optional(),
            Gender: Joi.any().optional(),
            Birth_Place_ID: Joi.number().optional(),
            Employment_ID: Joi.number().optional(),
            User_Name: Joi.any().optional(),
            Phone_Number: Joi.any().optional(),
            Bank_ID: Joi.any().optional(),
            Credit_Report_Path: Joi.any().optional(),
            Linkedin: Joi.any().optional(),
            Facebook: Joi.any().optional(),
            Instagram: Joi.any().optional(),
            Snapchat: Joi.any().optional(),
            DOB: Joi.any().optional(),
            Profile_Image: Joi.any().optional(),
            Latitude: Joi.any().optional(),
            Longitude: Joi.any().optional(),
            Home_address: Joi.any().optional(),
            Office_School_Address: Joi.any().optional(),
            Other_address: Joi.any().optional(),
            Annonymus_Status: Joi.any().optional(),
            Same_Gender: Joi.any().optional()
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            const userinfo = getCurrentUserInfo(req);
            console.log('userinfo', userinfo);
            let res = await User.findOne({
                where: {
                    Email: userinfo.Email
                }
            });
            let result;
            if (res) {
                let userdata = JSON.parse(JSON.stringify(res));
                const stringdata = JSON.stringify(res);
                const accessToken = jwt.sign({ username: stringdata, role: 'admin' }, secretToken);
                userdata['token'] = accessToken;
                result = successResponse('You has been already register', userdata);
            } else {
                let userData = req.body;
                userData['Email'] = userinfo.Email;
                let resobj = await User.create(req.body);
                let userdataObj = JSON.parse(JSON.stringify(resobj));
                const stringdata = JSON.stringify(resobj);
                const accessToken = jwt.sign({ username: stringdata, role: 'admin' }, secretToken);
                userdataObj['token'] = accessToken;
                result = successResponse('You has been register successfully', resobj);
            }
            return result;
        }

   // } catch (e) {
    //    return res.send(errorResponse(e));
   // }
};

const registerWithFb = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            First_Name: Joi.string().optional(),
            Last_Name: Joi.string().optional(),
            Email: Joi.string().optional(),
            Gender: Joi.any().optional(),
            Birth_Place_ID: Joi.number().optional(),
            Employment_ID: Joi.number().optional(),
            User_Name: Joi.any().optional(),
            Phone_Number: Joi.any().optional(),
            Bank_ID: Joi.any().optional(),
            Credit_Report_Path: Joi.any().optional(),
            Linkedin: Joi.any().optional(),
            Facebook: Joi.any().optional(),
            Instagram: Joi.any().optional(),
            Snapchat: Joi.any().optional(),
            DOB: Joi.any().optional(),
            Profile_Image: Joi.any().optional(),
            Latitude: Joi.any().optional(),
            Longitude: Joi.any().optional(),
            Home_Address: Joi.any().optional(),
            Office_School_Address: Joi.any().optional(),
            Other_Address: Joi.any().optional(),
            Annonymus_Status: Joi.any().optional(),
            Same_Gender: Joi.any().optional(),
            Fb_ID: Joi.any().required()
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await User.findOne({
                where: {
                    Fb_ID: req.body.Fb_ID
                }
            });
            let result;
            if (res) {
                let userdata = JSON.parse(JSON.stringify(res));
                const stringdata = JSON.stringify(res);
                const accessToken = jwt.sign({ username: stringdata, role: 'admin' }, secretToken);
                userdata['token'] = accessToken;
                result = successResponse('You has been already register', userdata);
            } else {
                let resobj = await User.create(req.body);
                let userdataObj = JSON.parse(JSON.stringify(resobj));
                const stringdata = JSON.stringify(resobj);
                const accessToken = jwt.sign({ username: stringdata, role: 'admin' }, secretToken);
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
            First_Name: Joi.string().optional(),
            Last_Name: Joi.string().optional(),
            Email: Joi.string().optional(),
            Gender: Joi.any().optional(),
            Birth_Place_ID: Joi.number().optional(),
            Employment_ID: Joi.number().optional(),
            User_Name: Joi.any().optional(),
            Phone_Number: Joi.any().optional(),
            Bank_ID: Joi.any().optional(),
            Credit_Report_Path: Joi.any().optional(),
            Linkedin: Joi.any().optional(),
            Facebook: Joi.any().optional(),
            Instagram: Joi.any().optional(),
            Snapchat: Joi.any().optional(),
            DOB: Joi.any().optional(),
            Profile_image: Joi.any().optional(),
            Latitude: Joi.any().optional(),
            Longitude: Joi.any().optional(),
            Home_Address: Joi.any().optional(),
            Office_School_Address: Joi.any().optional(),
            Other_Address: Joi.any().optional(),
            Annonymus_Status: Joi.any().optional(),
            Same_Gender: Joi.any().optional()
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
        console.log('userinfo', userinfo);
        let res = await User.findOne({
            where: {
                id: userinfo.id
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