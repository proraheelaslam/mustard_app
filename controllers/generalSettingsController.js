const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Property = require('../models/Property');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { QueryTypes } = require('sequelize');
const db = require('../models');


const filtersettings = async (req, res) => {
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
        const users = await db.sequelize.query("SELECT * FROM `user`", { type: QueryTypes.SELECT });

        let result = successResponse('Data has been listed', users);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

let generalSettingsController = {};
generalSettingsController.filtersettings = filtersettings;
module.exports = generalSettingsController;