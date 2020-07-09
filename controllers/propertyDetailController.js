const Joi = require('@hapi/joi');
const PropertyDetail = require('../models/PropertyDetail');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');


const store = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            property_id: Joi.required(),
            Picture_Path: Joi.any().optional(),
            Picture_Type: Joi.any().optional(),
            Picture_Comment: Joi.any().optional(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await PropertyDetail.create(req.body);
            let response = successResponse('Data has been created successfully', res);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse());
    }
};

const index = async (req, res) => {
    try {
        let response = await PropertyDetail.findOne({
            where: {
                Property_ID: req.params.id
            }
        });
        let result = successResponse('Property Detail has been listed', response);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

let propertyDetailController = {};
propertyDetailController.store = store;
propertyDetailController.index = index;
module.exports = propertyDetailController;