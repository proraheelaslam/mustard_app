const Joi = require('@hapi/joi');
const UserReference = require('../models/UserReference');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');

const lists = async (req, res) => {
    try {
        let response = await UserReference.findAll({
            where: {
                user_id: req.params.id
            }
        });
        let result = successResponse('Data has been listed', response);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const store = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            user_id: Joi.required(),
            reference_name: Joi.required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await UserReference.create(req.body);
            let response = successResponse('Data has been created successfully', res);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

let userReferenceContoller = {};
userReferenceContoller.store = store;
userReferenceContoller.lists = lists;
module.exports = userReferenceContoller;