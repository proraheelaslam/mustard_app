const Joi = require('@hapi/joi');
const User = require('../models/User');
const { successResponse, errorResponse, validationResponse, notFoundResponse } = require('../utils/apiResponse');
const { getCurrentUserInfo } = require('../utils/Helpers');
const TempLogin = require('../models/TempLogin');
const accessTokenSecret = 'youraccesstokensecret';
const jwt = require('jsonwebtoken');
const multer = require('multer');

const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/upload');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    });
    return storage;
};

const store = async (req, res) => {
    try {
        console.log('req.file.filename ;', req.file.filename)
        const schema = Joi.object().keys({
            uploadFile: Joi.string().optional(),
            type: Joi.string().optional(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            res.send(validationResponse(error.message));
        } else {
            // let res = await Employment.create(req.body);
            return successResponse('The specified action performed successfully', req.body);
        }

    } catch (e) {
        return res.send(errorResponse(e));
    }
};

let mediaFileController = {};
mediaFileController.uploadFile = uploadFile;
mediaFileController.store = store;
module.exports = mediaFileController;
