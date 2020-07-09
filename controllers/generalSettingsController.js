const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Property = require('../models/Property');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { QueryTypes, ARRAY } = require('sequelize');
const db = require('../models');
var geoip = require('geoip-lite');

const filtersettings = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            area: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.send(validationResponse(error.message));
        }

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

        const area = req.body.area;

        const query = `SELECT 
        MIN(rent) min_rent,
        MAX(rent) max_rent,
        MIN(minimum_resident_days) min_rental_period,
        MAX(minimum_resident_days) max_rental_period,
        MIN(Moving_in_date) min_earliest_occupation,
        MAX(Moving_in_date) max_earliest_occupation,
        MAX(no_of_rooms) rooms,
        MIN(Tenanat_commuting_time) min_commuting_time,
        MAX(Tenanat_commuting_time) max_commuting_time
        from properties
        WHERE area IN ('${area}')
        AND deletedAT IS NULL`;

        const responseData = await db.sequelize.query(query, { type: QueryTypes.SELECT });

        let returnData = []
        let data = JSON.parse(JSON.stringify(responseData));
        if (data && data.length) {
            returnData = data[0]
        }


        let result = successResponse('Data has been listed', returnData);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const getFilterSettings = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            search_type: Joi.number().required(),
            area_type: Joi.number().optional(),
            area: Joi.array().optional(),
            latitude: Joi.any().optional(),
            longitude: Joi.any().optional(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.send(validationResponse(error.message));
        }

        const area = req.body.area;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        let aresstring;
        let area_title;
        if (area) {
            area_title = area.map(res => res.area_title);
            aresstring = area_title.join();
        }

        if (req.body.search_type == 1) {
            let query = ` SELECT
            MIN(rent) min_rent,
            MAX(rent) max_rent,
            MIN(minimum_resident_days) min_rental_period,
            MAX(minimum_resident_days) max_rental_period,
            MIN(Moving_in_date) min_earliest_occupation,
            MAX(Moving_in_date) max_earliest_occupation,
            MAX(no_of_rooms) rooms,
            MIN(Tenanat_commuting_time) min_commuting_time,
            MAX(Tenanat_commuting_time) max_commuting_time
            FROM properties`;

            if (aresstring) {
                query += ' ' + `WHERE area IN ('${area_title}')`;
            }

            if (latitude && longitude) {
                query += ' ' + `WHERE longitude = ${longitude}`;
                query += ' ' + `AND latitude = ${latitude}`;
            }

            if (!aresstring && (!latitude || !longitude)) {
                var ip = '37.111.139.175';
                var geo = geoip.lookup(ip);
                console.log('geo', geo);
            }

            query += ' ' + `AND deletedAT IS NULL`;
            console.log('query', query);

            const responseData = await db.sequelize.query(query, { type: QueryTypes.SELECT });

            let returnData = [];
            let data = JSON.parse(JSON.stringify(responseData));
            if (data && data.length) {
                returnData = data[0]
            }

            // // 

            // var ip = '37.111.139.175';
            // var geo = geoip.lookup(ip);
            // console.log('geo', geo);
            // returnData['geo'] = geo;

            //console.log('responseresponse', returnData);
            let result = successResponse('Data has been listed', returnData);
            return result;


        } else if (req.body.search_type == 2) {
            return 'still this type is in progress plz use 1';
        } else if (req.body.search_type == 3) {
            return 'still this type is in progress plz use 1';
        } else {
            return 'invalid search type should be 1,2 or 3';
        }

    } catch (e) {
        return errorResponse(e);
    }
}


let generalSettingsController = {};
generalSettingsController.filtersettings = filtersettings;
generalSettingsController.getFilterSettings = getFilterSettings;
module.exports = generalSettingsController;