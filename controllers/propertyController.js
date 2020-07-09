const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Property = require('../models/Property');
const UserFavouriteProperty = require('../models/UserFavouriteProperty');
const { getCurrentUserInfo } = require('../utils/Helpers');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer = require('multer');
const { QueryTypes } = require('sequelize');
const db = require('../models');

const store = async (req, res) => {

    try {
        const schema = Joi.object().keys({
            User_ID: Joi.required(),
            Area: Joi.string().required(),
            Address: Joi.any().optional(),
            Latitude: Joi.any().optional(),
            Longitude: Joi.any().optional(),
            Rent: Joi.string().required(),
            Minimum_Rent: Joi.any().optional(),
            No_Of_Rooms: Joi.any().optional(),
            No_Of_Bathrooms: Joi.any().optional(),
            Furnishing: Joi.any().optional(),
            Property_Type: Joi.any().optional(),
            Address_Type: Joi.number().optional(),
            Bidding_Status: Joi.any().optional(),
            Minimum_Resident_Days: Joi.any().optional(),
            Moving_In_Date: Joi.any().optional(),
            Bidding_Close_Date: Joi.any().optional(),
            Tenant_Gender: Joi.any().optional(),
            Tenant_Language: Joi.any().optional(),
            Tenant_Smoker: Joi.any().optional(),
            Tenanat_Pet: Joi.any().optional(),
            Tenanat_Commuting_Time: Joi.any().optional(),
            Property_URL: Joi.any().optional(),
            Ad_Start_Date: Joi.any().optional(),
            Ad_End_Date: Joi.any().optional()
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

const update = async (req, res) => {

    try {
        const schema = Joi.object().keys({
            User_id: Joi.required(),
            Area: Joi.any().optional(),
            Address: Joi.any().optional(),
            Rent: Joi.any().optional(),
            Minimum_Rent: Joi.any().optional(),
            No_Of_Rooms: Joi.any().optional(),
            No_Of_Bathrooms: Joi.any().optional(),
            Furnishing: Joi.any().optional(),
            Property_Type: Joi.any().optional(),
            Bidding_Status: Joi.any().optional(),
            Minimum_Resident_Days: Joi.any().optional(),
            Moving_In_Date: Joi.any().optional(),
            Bidding_Close_Date: Joi.any().optional(),
            Tenant_Gender: Joi.any().optional(),
            Tenant_Language: Joi.any().optional(),
            Tenant_Smoker: Joi.any().optional(),
            Tenanat_Pet: Joi.any().optional(),
            Tenanat_Commuting_Time: Joi.any().optional(),
            Property_URL: Joi.any().optional(),
            Ad_Start_Date: Joi.any().optional(),
            Ad_End_Date: Joi.any().optional()
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res = await Property.update(req.body, { where: { id: req.params.id } });
            let response = successResponse('The specified action performed', res);
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

const changestatus = async (req, res) => {
    try {
        console.log(' req.params.id', req.params.id)
        let res = await Property.findOne({
            where: {
                ID: req.params.id
            }
        });
        let result;
        if (res) {
            const id = req.params.id;
            const isactive = req.params.active;
            let response = Property.update({ active: isactive }, { where: { ID: id }, returning: true });
            result = successResponse('The specified action performed', true);
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
        const userinfo = getCurrentUserInfo(req);
        let singleProperty = await Property.findAll({
            where: {
                User_ID: userinfo.id
            },
            include: [{ all: true, nested: true }],
        });
        let result = successResponse('Data has been listed', singleProperty);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const getPropertyByUser = async (req, res) => {
    try {
        const userid = req.params.user_id;
        let singleProperty = await Property.findAll({
            where: {
                User_ID: userid
            },
            include: [{ all: true, nested: true }],
        });
        let result = successResponse('Data has been listed', singleProperty);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const getPropertyByUserIdwithStatus = async (req, res) => {
    try {
        const status = req.params.active;
        const userinfo = getCurrentUserInfo(req);
        let singleProperty = await Property.findAll({
            where: {
                User_ID: userinfo.id,
                active: status == 'inactive' ? false : true
            },
            include: [{ all: true, nested: true }],
        });
        let result = successResponse('Data has been listed', singleProperty);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const discover = async (req, res) => {
    //try {
    let response = await Property.findAll({
        where: {
            active: true
        },
        include: [{ all: true, nested: true }],
    });

    // const query = `SELECT *
    // FROM properties AS p
    // INNER JOIN property_lookup_details AS PLD ON p.id = PLD.property_id
    // WHERE p.property_type = 'own'
    // AND PLD.id IN (1) 
    // AND PLD.value = 1
    // AND p.area IN ('lahore')
    // AND rent >= 1
    // AND rent <= 1
    // AND No_of_rooms <= 1
    // AND moving_in_date <= 1
    // AND moving_in_date >= 1
    // AND minimum_resident_days <= 1
    // AND minimum_resident_days >= 1
    // AND deletedAT IS NULL`;

    // INNER JOIN property_lookup_details AS PLD ON p.id = PLD.property_id

    let query2 = `SELECT p.id,p.no_of_rooms,PLD.lookup_property_id

    FROM properties AS p
    LEFT JOIN property_lookup_details AS PLD ON p.id = PLD.property_id
    WHERE p.property_type = 'own'
    AND p.id =5`;


    // if (req.body.property_type) {
    //     query2 += ' ' + `AND property_type ='${req.body.property_type}'`;
    // }

    // if (req.body.no_of_rooms) {
    //     query2 += ' ' + `AND no_of_rooms <='${req.body.no_of_rooms}'`;
    // }

    console.log('query', query2);

    const responseData = await db.sequelize.query(query2, { type: QueryTypes.SELECT });
    let result = successResponse('Data has been listed', responseData);
    return result;
    // } catch (e) {
    //     return errorResponse(e);
    // }
};

const favourite = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.any().optional(),
            User_ID: Joi.number().required(),
            Property_ID: Joi.number().required(),
            Favourite: Joi.required(),
            Comments: Joi.any().optional(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.send(validationResponse(error.message));
        } else {
            let res;
            if (req.body.id) {
                res = await UserFavouriteProperty.update(req.body, { where: { id: req.body.id } });
            } else {
                res = await UserFavouriteProperty.create(req.body);
            }
            let response = successResponse('The specified action has been performed successfully', res);
            return response;
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }

};

const getfavourite = async (req, res) => {
    try {
        const userinfo = getCurrentUserInfo(req);
        let singleProperty = await Property.findAll({
            where: {
                user_id: userinfo.username
            },
            include: [{ all: true, nested: true }],
        });

        let result = successResponse('Data has been listed', singleProperty);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

let property = {};
property.discover = discover;
property.show = show;
property.getfavourite = getfavourite;
property.update = update;
property.favourite = favourite;
property.store = store;
property.destroy = destroy;
property.changestatus = changestatus;
property.getPropertyByUserId = getPropertyByUserId;
property.getPropertyByUserIdwithStatus = getPropertyByUserIdwithStatus;
property.getPropertyByUser = getPropertyByUser;
module.exports = property;