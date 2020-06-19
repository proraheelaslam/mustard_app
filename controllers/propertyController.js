const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Property = require('../models/Property');
const PropertyDetail = require('../models/PropertyDetail');
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
            area: Joi.string().required(),
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

const show = async (req, res) => {
    try {
        let singleProperty = await Property.findOne({
            where: {
                id: req.params.id
            }
        });
        let result = successResponse('Data has been listed', singleProperty);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const destroy = async (req, res) => {
    try {
        let res = await Property.findOne({
            where: {
                id: req.params.id
            }
        });
        let result;
        if (res) {
            let response = res.destroy();
            result = successResponse('The specified action performed', res);
        } else {
            result = notFoundResponse('Invalid Id');
        }
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const getPropertyByUserId = async (req, res) => {

    try {
        let singleProperty = await Property.findAll({
            where: {
                user_id: req.params.user_id
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
        let response = await Property.findAll({ include: [PropertyDetail] });
        let result = successResponse('Data has been listed', response);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};


let property = {};
property.discover = discover;
property.lists = lists;
property.show = show;
property.store = store;
property.destroy = destroy;
property.getPropertyByUserId = getPropertyByUserId;
module.exports = property;