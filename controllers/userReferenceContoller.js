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
            User_ID: Joi.required(),
            Reference_Name: Joi.required(),
            Reference_Type: Joi.any().optional(),
            Reference_Comments: Joi.any().optional(),
            Reference_Email: Joi.any().optional(),
            Refernce_Phone_Number: Joi.any().optional(),
            Is_Mustard_App_User: Joi.any().optional(),
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
            Reference_Name: Joi.any().optional(),
            Reference_Type: Joi.any().optional(),
            Reference_Comments: Joi.any().optional(),
            Reference_Email: Joi.any().optional(),
            Refernce_Phone_Number: Joi.any().optional(),
            Is_mustard_App_User: Joi.any().optional(),
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