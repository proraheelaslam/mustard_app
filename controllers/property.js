const Joi = require('@hapi/joi');
const constants = require('../utils/constants');
const Property = require('../models/Property');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const multer  = require('multer');


//

const store = async (req,res)=> {

    try {

        const schema = Joi.object().keys({
            user_id: Joi.string().required(),
            address: Joi.string().required(),
            rent: Joi.string().required(),
            minimum_rent: Joi.string().required()
        });
        const { error } = schema.validate(req.body);

        if(error) {
            res.send(validationResponse(error.message));
        }else {

                let res = await Property.create({

                    user_id: req.body.user_id,
                    no_of_rooms:0,
                    no_of_bathrooms:0,
                    address: req.body.address,
                    furnishing:'',
                    property_type:'',
                    bidding_status:'',
                    rent:req.body.rent,
                    minimum_rent:req.body.minimum_rent,
                    minimum_resident_days:0,
                    moving_in_date:'',
                });
                let response = successResponse('Property has been created successfully',res);
            return response;
        }

    }catch (e) {
        return res.send(errorResponse());
    }
};

const getPropertyByUser = async (req,res) => {

    try {
        let singleProperty = await Property.findOne({
            where: {
                user_id: req.params.id
            }
        });
        let result = successResponse('Property has been listed',singleProperty);
        return result;
    }catch (e) {
        return errorResponse();
    }
};

const getPropertyById = async (req,res) => {

    try {
        let singleProperty = await Property.findOne({
            where: {
                user_id: req.params.id
            }
        });
        let result = successResponse('Property has been listed',singleProperty);
        return result;
    }catch (e) {
        return errorResponse();
    }
};
let property = {};
property.store = store;
property.getPropertyByUser = getPropertyByUser;
property.getPropertyById = getPropertyById;


module.exports  = property;