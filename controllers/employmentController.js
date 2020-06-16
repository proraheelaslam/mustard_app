const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Employment = require('../models/Employment');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');

const store = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await Employment.create(req.body);
            return successResponse('The specified action performed successfully', res);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const lists = async (req, res) => {
    try {
        let res = await Employment.findAll({});
        let result = successResponse('The specified action performed successfully', res);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

let employmentController = {};
employmentController.store = store;
employmentController.lists = lists;
module.exports = employmentController;