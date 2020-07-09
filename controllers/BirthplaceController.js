

const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Birthplace = require('../models/Birthplace');
const { successResponse, errorResponse, validationResponse, notFoundResponse, responseValidator } = require('../utils/apiResponse');
const multer = require('multer');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const store = async (req, res) => {

    try {
        const schema = Joi.object().keys({
            Name: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await Birthplace.create({
                Name: req.body.Name,
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

const searchBirthPlaces = async (req, res) => {
    try {
        const Name = req.body.Name || '';
        let birthplace = await Birthplace.findAll({
            attributes: ['Name', 'id'],
            where: {
                Name: {
                    [Op.like]: `%${Name}%`
                }
            },
        });
        let result = successResponse('Data has been listed', birthplace);
        return result;
    } catch (e) {
        return errorResponse();
    }
};

const destroy = async (req, res) => {
    try {
        let res = await Birthplace.findOne({
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

let birthplaceController = {};
birthplaceController.store = store;
birthplaceController.lists = lists;
birthplaceController.searchBirthPlaces = searchBirthPlaces;
birthplaceController.destroy = destroy;
module.exports = birthplaceController;