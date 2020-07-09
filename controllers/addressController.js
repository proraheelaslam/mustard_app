const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Address = require('../models/Address');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');

const store = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            Name: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await Address.create(req.body);
            return successResponse('Address has been created successfully', res);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const lists = async (req, res) => {
    try {
        let address = await Address.findAll({
        });
        let result = successResponse('Address has been listed', address);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};
let address = {};
address.store = store;
address.lists = lists;
module.exports = address;