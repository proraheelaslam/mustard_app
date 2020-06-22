const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Employment = require('../models/Employment');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const lists = async (req, res) => {
    try {
        // token = req.headers['authorization'];
        // let bearerToken = token.split(' ');
        // let brToken = bearerToken[1];
        // const decode = jwt.decode(brToken, 'youraccesstokensecret');
        // console.log('decode', decode);
        let res = await Employment.findAll({});
        let result = successResponse('The specified action performed successfully', res);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

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


const destroy = async (req, res) => {
    try {
        let res = await Employment.findOne({
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


const update = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await Employment.update(req.body, { where: { id: req.params.id } });
            let response = successResponse('The specified action performed', true);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const show = async (req, res) => {
    try {
        let singleProperty = await Employment.findOne({
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

let employmentController = {};
employmentController.store = store;
employmentController.lists = lists;
employmentController.destroy = destroy;
employmentController.show = show;
employmentController.update = update;
module.exports = employmentController;