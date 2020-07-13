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
    // let response = await Property.findAll({
    //     where: {
    //         active: true
    //     },
    //     include: [{ all: true, nested: true }],
    // });
    debugger
    // const query = `SELECT *
    // FROM Property AS p
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

    // LEFT JOIN Property_Lookup_Details AS PLD ON p.id = PLD.Property_ID



    // if (req.body.property_type) {
    //     query2 += ' ' + `AND property_type ='${req.body.property_type}'`;
    // }

    // if (req.body.no_of_rooms) {
    //     query2 += ' ' + `AND no_of_rooms <='${req.body.no_of_rooms}'`;
    // }




    let query7 = `
    SELECT Property.*, 'prefix_start_property_detail', property_detail.*, 'prefix_endprefix_start_property_detail'
    FROM Property AS Property
    LEFT OUTER JOIN Property_Details AS property_detail ON Property.id = property_detail.Property_ID
    LEFT OUTER JOIN Favourite_Property AS favourite_property ON Property.id = favourite_property.property_id 
    LEFT OUTER JOIN Property_Lookup_Details AS PropertyLookupDetails ON Property.id = PropertyLookupDetails.Property_ID
    WHERE (Property.deletedAt IS NULL AND Property.active = TRUE)`;

    let query3 = `SELECT *
    FROM Property AS Property
    WHERE Property.deletedAt IS NULL
    AND Property.active = TRUE`;

    let query4 = `SELECT *
    FROM Property_Details`;

    let query5 = `SELECT *
    FROM Property
    WHERE value IN (SELECT *
                     FROM Property_Details
                    WHERE condition)`;

    let query6 = `SELECT  Property.*, 
    Suppliers.Id as [Suppliers.Id], 
    Suppliers.Name as [Suppliers.Name],
    Comments.Id as [Comments.Id],
    Comments.Text as [Comments.Text],
    Comments.ProductId as [Comments.ProductId] 
    FROM Products
    LEFT OUTER JOIN X_Product_Supplier ON X_Product_Supplier.ProductId = Products.Id
    LEFT OUTER JOIN Suppliers ON X_Product_Supplier.SupplierId = Suppliers.Id
    LEFT OUTER JOIN Comments ON Comments.ProductId = Products.Id
    FOR JSON PATH`;



    let query2 = `
    SELECT Property.*, 'prefix_start_property_detail', property_detail.*, 'prefix_endprefix_start_property_detail'
    FROM Property AS Property
    LEFT OUTER JOIN Property_Details AS property_detail ON Property.id = property_detail.Property_ID
    LEFT OUTER JOIN Favourite_Property AS favourite_property ON Property.id = favourite_property.property_id 
    LEFT OUTER JOIN Property_Lookup_Details AS PropertyLookupDetails ON Property.id = PropertyLookupDetails.Property_ID
    WHERE (Property.deletedAt IS NULL AND Property.active = TRUE)`;


    const responseStreem = await db.sequelize.query(query3, { type: QueryTypes.SELECT });
    let retuendata = {};
    let responseData = JSON.parse(JSON.stringify(responseStreem));
    retuendata['property_data'] = responseData;
    const responseStreem2 = await db.sequelize.query(query4, { type: QueryTypes.SELECT });

    // responseData['property_detail'] = JSON.parse(JSON.stringify(responseStreem2));
    retuendata['property_detail'] = JSON.parse(JSON.stringify(responseStreem2));
    const query2ddd = await db.sequelize.query(query2, { type: QueryTypes.SELECT });


    let result = successResponse('Data has been listed111', retuendata);

    return result;
    // } catch (e) {
    //     return errorResponse(e);
    // }
};

const discover2 = async (req, res) => {
    try {
        let query3 = `SELECT *
                    FROM Property AS Property
                    WHERE Property.deletedAt IS NULL
                    AND Property.active = TRUE`;

        let query4 = `SELECT *
                    FROM Property_Details`;

        let retuendata = {};
        const responseStreem = await db.sequelize.query(query3, { type: QueryTypes.SELECT });
        const responseStreem2 = await db.sequelize.query(query4, { type: QueryTypes.SELECT });
        let responseData = JSON.parse(JSON.stringify(responseStreem));
        let responseData2 = JSON.parse(JSON.stringify(responseStreem2));

        retuendata['property_detail'] = JSON.parse(JSON.stringify(responseStreem2));
        const query2ddd = await db.sequelize.query(query2, { type: QueryTypes.SELECT });
        let result = successResponse('Data has been listed111', retuendata);

    } catch (e) {
        return errorResponse(e);
    }

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
        console.log('userinfo', userinfo)
        let singleProperty = await Property.findAll({
            where: {
                user_id: userinfo.id
            },
            include: [{ all: true, nested: true }],
        });


        let query3 = `SELECT *
        FROM Property AS p
        LEFT JOIN Favourite_Property AS PLD ON p.User_ID = PLD.User_ID
        WHERE p.User_ID= ${userinfo.id}`;

        const responseData = await db.sequelize.query(query3, { type: QueryTypes.SELECT });

        let result = successResponse('Data has been listed', responseData);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};


const discover3 = async (req, res) => {
    try {
        let query = `SELECT *
                FROM Property AS Property
                WHERE (Property.deletedAt IS NULL AND Property.active = TRUE)`;

        if (req.body.Property_Type) {
            query += ' ' + `AND Property_Type ='${req.body.Property_Type}'`;
        }

        if (req.body.No_Of_Rooms) {
            query += ' ' + `AND No_Of_Rooms <='${req.body.No_Of_Rooms}'`;
        }

        if (req.body.Min_Rent) {
            query += ' ' + `AND Minimum_Rent <='${req.body.Min_Rent}'`;
        }

        if (req.body.Max_Rent) {
            query += ' ' + `AND Rent >='${req.body.Max_Rent}'`;
        }

        if (req.body.Min_Rental_Period) {
            query += ' ' + `AND Minimum_Resident_Days <='${req.body.Min_Rental_Period}'`;
        }

        if (req.body.Max_Rental_Period) {
            query += ' ' + `AND Minimum_Resident_Days >='${req.body.Max_Rental_Period}'`;
        }


        if (req.body.Min_Commuting_Time) {
            query += ' ' + `AND Tenanat_Commuting_Time <='${req.body.Min_Commuting_Time}'`;
        }

        if (req.body.Max_Commuting_Time) {
            query += ' ' + `AND Tenanat_Commuting_Time >='${req.body.Max_Commuting_Time}'`;
        }

        if (req.body.Min_Earliest_Occupation) {
            query += ' ' + `AND Moving_In_Date <='${req.body.Min_Earliest_Occupation}'`;
        }

        if (req.body.Max_Earliest_Occupation) {
            query += ' ' + `AND Moving_In_Date >='${req.body.Max_Earliest_Occupation}'`;
        }

        const responseStreem = await db.sequelize.query(query, { type: QueryTypes.SELECT });
        let result = successResponse('Data has been listed', responseStreem);

        return result;
    } catch (e) {
        return errorResponse(e);
    }
};

const discover4 = async (req, res) => {
    try {
        let response = await Property.findAll({
            where: {
                active: true
            },
            include: [{ all: true, nested: true }],
        });
        let result = successResponse('Data has been listed', response);
        return result;
    } catch (e) {
        return errorResponse(e);
    }
};



let property = {};
// property.discover = discover4;
property.discover = discover3;
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