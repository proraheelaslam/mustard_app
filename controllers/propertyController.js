const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Property = require('../models/Property');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');

const lists = async (req, res) => {
    try {
        let response = await Property.findAll({});
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
            address: Joi.any().optional(),
            rent: Joi.string().required(),
            minimum_rent: Joi.any().optional(),
            no_of_rooms: Joi.any().optional(),
            no_of_bathrooms: Joi.any().optional(),
            furnishing: Joi.any().optional(),
            property_type: Joi.any().optional(),
            bidding_status: Joi.any().optional(),
            minimum_resident_days: Joi.any().optional(),
            moving_in_date: Joi.any().optional(),
            bidding_close_date: Joi.any().optional(),
            tenant_gender: Joi.any().optional(),
            tenant_language: Joi.any().optional(),
            tenant_smoker: Joi.any().optional(),
            tenanat_pet: Joi.any().optional(),
            tenanat_commuting_time: Joi.any().optional(),
            property_url: Joi.any().optional(),
            ad_start_date: Joi.any().optional(),
            ad_end_date: Joi.any().optional(),
            status: Joi.any().optional(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await Property.create(req.body);
            let response = successResponse('Property has been created successfully', res);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const getPropertyByUser = async (req, res) => {

    try {
        let singleProperty = await Property.findAll({
            where: {
                user_id: req.params.id
            }
        });
        let result = successResponse('Data has been listed', singleProperty);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const discover = async (req, res) => {
    try {
        let response = await Property.findAll({});
        let result = successResponse('Data has been listed', response);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};


let property = {};
property.discover = discover;
property.lists = lists;
property.store = store;
property.getPropertyByUser = getPropertyByUser;
module.exports = property;