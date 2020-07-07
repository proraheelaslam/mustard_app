const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const DeviceToken = require('../models/DeviceToken');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const mailService = require('../utils/mail');

const store = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            device_os: Joi.string().optional(),
            fcm_token: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await DeviceToken.create(req.body);
            return successResponse('The specified action performed successfully', res);
        }

    } catch (e) {
        return res.send(errorResponse());
    }
};

let DeviceTokenController = {};
DeviceTokenController.store = store;
module.exports = DeviceTokenController;