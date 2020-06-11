

const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Birthplace = require('../models/Birthplace');
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
            let res = await Birthplace.create({
                name: req.body.name,
            });
            return successResponse('The specified action performed successfully', res);
        }

    } catch (e) {
        return res.send(errorResponse());
    }
};

const lists = async (req, res) => {
    try {
        let birthplace = await Birthplace.findAll({});
        let result = successResponse('Data has been listed', birthplace);
        return result;
    } catch (e) {
        return errorResponse();
    }
};

let BirthplaceController = {};
BirthplaceController.store = store;
BirthplaceController.lists = lists;
module.exports = BirthplaceController;