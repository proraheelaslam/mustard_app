const Joi = require('@hapi/joi');
const UserReference = require('../models/UserReference');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');

const index = async (req, res) => {
    try {
        let response = await UserReference.findAll({
            where: {
                user_id: req.params.userid
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
            reference_type: Joi.any().optional(),
            reference_comments: Joi.any().optional(),
            reference_email: Joi.any().optional(),
            refernce_phone_number: Joi.any().optional(),
            is_mustard_app_user: Joi.any().optional(),
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

const update = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            reference_name: Joi.any().optional(),
            reference_type: Joi.any().optional(),
            reference_comments: Joi.any().optional(),
            reference_email: Joi.any().optional(),
            refernce_phone_number: Joi.any().optional(),
            is_mustard_app_user: Joi.any().optional(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            const id = req.params.id;
            let res = await UserReference.update(req.body, { where: { id: id }, returning: true });
            let response = successResponse('Data has been created successfully', true);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

const show = async (req, res) => {
    try {
        console.log('user_id', req.params.id)
        let res = await UserReference.findOne({
            where: {
                user_id: req.params.userid,
                id: req.params.id
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

const destroy = async (req, res) => {
    try {
        let res = await UserReference.findOne({
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

let userReferenceContoller = {};
userReferenceContoller.index = index;
userReferenceContoller.store = store;
userReferenceContoller.show = show;
userReferenceContoller.update = update;
userReferenceContoller.destroy = destroy;
module.exports = userReferenceContoller;