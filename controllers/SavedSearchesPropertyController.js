const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const SavedSearchesProperty = require('../models/SavedSearchesProperty');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { QueryTypes } = require('sequelize');
const db = require('../models');


const store = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            User_ID: Joi.required(),
            API_String: Joi.string().optional(),
            Name: Joi.string().optional(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await SavedSearchesProperty.create(req.body);
            return successResponse('The specified action performed successfully', res);
        }

    } catch (e) {
        return res.send(errorResponse());
    }
};

const lists = async (req, res) => {
    try {
        const userinfo = getCurrentUserInfo(req);
        let response = await SavedSearchesProperty.findAll({
            where: {
                User_ID: userinfo.username
            }
        });
        let result = successResponse('Data has been listed', response);
        return result;
    } catch (e) {
        return errorResponse();
    }
};


const getbyuserId = async (req, res) => {
    try {
        let res = await SavedSearchesProperty.findOne({
            where: {
                User_ID: req.params.userid
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
            User_ID: Joi.required(),
            API_String: Joi.string().optional(),
            Name: Joi.string().optional(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            const id = req.params.id;
            let res = await SavedSearchesProperty.update(req.body, { where: { id: id }, returning: true });
            let response = successResponse('Data has been updated successfully', true);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};


let SavedSearchesPropertyController = {};
SavedSearchesPropertyController.lists = lists;
SavedSearchesPropertyController.store = store;
SavedSearchesPropertyController.getbyuserId = getbyuserId;
SavedSearchesPropertyController.update = update;
module.exports = SavedSearchesPropertyController;