const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Address = require('../models/Address');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');


const lists = async (req, res) => {
    try {
        const response = {
            "monthly_rental": {
                "min": "100",
                "max": "100000"
            },
            rental_period: {
                "min": "1",
                "max": "10"
            },
            earliest_occupation: {
                "min": "1",
                "max": "10"
            },
            commuting_time: {
                "min": "1",
                "max": "10"
            },
            rooms: "10",
            age: "70"
        }
        let result = successResponse('Data has been listed', response);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

let generalSettingsController = {};
generalSettingsController.lists = lists;
module.exports = generalSettingsController;