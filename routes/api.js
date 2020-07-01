const express = require('express');
const router = express.Router();
const multer = require('multer');
const tempLogin = require('../controllers/tempLoginController');
const userController = require('../controllers/userController');
const address = require('../controllers/addressController');
const property = require('../controllers/propertyController');
const propertyDetailController = require('../controllers/propertyDetailController');
const birthplaceController = require('../controllers/birthplaceController');
const userReferenceContoller = require('../controllers/userReferenceContoller');
const employmentController = require('../controllers/employmentController');
const generalSettingsController = require('../controllers/generalSettingsController');
const AuthMiddleware = require('../middleware/auth-middleware').AuthMiddleware;
const mediaFileController = require('../controllers/mediaFileController');
const savedSearchesPropertyController = require('../controllers/SavedSearchesPropertyController');
const DeviceTokenController = require('../controllers/DeviceTokenController');

const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload');

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });


const uploadFile = multer({ storage: mediaFileController.uploadFile() });

/* API Routes */

router.post('/guest-login', upload.none(), async (req, res, next) => {
    let userData = await userController.guestLogin(req, res);
    res.send(userData);
});

router.post('/upload', uploadFile.single('uploadFile'), async (req, res, next) => {
    let userData = await mediaFileController.store(upload, req, res);
    res.send(userData);
});

router.get('/user/:id', AuthMiddleware.authorization, async (req, res, next) => {
    let userData = await userController.show(req, res);
    res.send(userData);
});

router.get('/current-user', AuthMiddleware.authorization, async (req, res, next) => {
    let userData = await userController.currentUser(req, res);
    res.send(userData);
});

router.post('/user', AuthMiddleware.guestauthorization, async (req, res, next) => {
    let userData = await userController.register(req, res);
    res.send(userData);
});

router.post('/register_with_fb', upload.none(), async (req, res, next) => {
    let userData = await userController.registerWithFb(req, res);
    res.send(userData);
});

router.put('/user/:id', upload.none(), async (req, res, next) => {
    let userData = await userController.update(req, res);
    res.send(userData);
});

router.post('/send-invitation', upload.none(), async (req, res, next) => {
    let userData = await tempLogin.sendInvitation(req, res);
});

router.post('/resend-invitation', upload.none(), async (req, res, next) => {
    let userData = await tempLogin.resendInvitation(req, res);
});


router.get('/user/reference/:userid', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.index(req, res);
    res.send(response);
});

router.get('/user/reference/:userid/:id', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.show(req, res);
    res.send(response);
});

router.post('/user/reference', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.store(req, res);
    res.send(response);
});

router.put('/user/reference/:id', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.update(req, res);
    res.send(response);
});


router.delete('/user/reference/:id', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.destroy(req, res);
    res.send(response);
});

router.post('/address', upload.none(), async (req, res, next) => {
    let addressRes = await address.store(req, res);
    res.send(addressRes);
});

router.get('/address', upload.none(), async (req, res, next) => {
    let addressRes = await address.lists(req, res);
    res.send(addressRes);
});


router.post('/property', upload.none(), async (req, res, next) => {
    let propertyRes = await property.store(req, res);
    res.send(propertyRes);
});

router.put('/property/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.update(req, res);
    res.send(propertyRes);
});

router.get('/user-property/:active', AuthMiddleware.authorization, async (req, res, next) => {
    let propertyRes = await property.getPropertyByUserIdwithStatus(req, res);
    res.send(propertyRes);
});

router.get('/user-property', AuthMiddleware.authorization, async (req, res, next) => {
    let propertyRes = await property.getPropertyByUserId(req, res);
    res.send(propertyRes);
});

router.get('/property/getByuser/:user_id', AuthMiddleware.authorization, async (req, res, next) => {
    let propertyRes = await property.getPropertyByUser(req, res);
    res.send(propertyRes);
});

router.get('/property/favourite', AuthMiddleware.authorization, async (req, res, next) => {
    let propertyRes = await property.getfavourite(req, res);
    res.send(propertyRes);
});

router.post('/property/favourite', upload.none(), async (req, res, next) => {
    let propertyRes = await property.favourite(req, res);
    res.send(propertyRes);
});

router.get('/property/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.show(req, res);
    res.send(propertyRes);
});

router.delete('/property/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.destroy(req, res);
    res.send(propertyRes);
});

router.get('/property/update-status/:id/:active', upload.none(), async (req, res, next) => {
    let propertyRes = await property.changestatus(req, res);
    res.send(propertyRes);
});

router.post('/property/discover', AuthMiddleware.authorization, async (req, res, next) => {
    let propertyRes = await property.discover(req, res);
    res.send(propertyRes);
});

router.get('/property-detail/:id', upload.none(), async (req, res, next) => {
    let response = await propertyDetailController.index(req, res);
    res.send(response);
});

router.post('/property-detail', upload.none(), async (req, res, next) => {
    let response = await propertyDetailController.store(req, res);
    res.send(response);
});

router.post('/birthplace', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.store(req, res);
    res.send(response);
});

router.post('/search-birthplace', AuthMiddleware.guestauthorization, async (req, res, next) => {
    let response = await birthplaceController.searchBirthPlaces(req, res);
    res.send(response);
});

router.get('/birthplace', AuthMiddleware.authorization, async (req, res, next) => {
    let response = await birthplaceController.lists(req, res);
    res.send(response);
});

router.delete('/birthplace/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await birthplaceController.destroy(req, res);
    res.send(propertyRes);
});

router.post('/employment', AuthMiddleware.authorization, async (req, res, next) => {
    let response = await employmentController.store(req, res);
    res.send(response);
});

router.put('/employment/:id', AuthMiddleware.authorization, async (req, res, next) => {
    let response = await employmentController.update(req, res);
    res.send(response);
});

router.get('/employment', AuthMiddleware.guestauthorization, async (req, res, next) => {
    let response = await employmentController.lists(req, res);
    res.send(response);
});

router.get('/employment/:id', upload.none(), async (req, res, next) => {
    let response = await employmentController.show(req, res);
    res.send(response);
});

router.delete('/employment/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await employmentController.destroy(req, res);
    res.send(propertyRes);
});

router.post('/general/filters/settings', upload.none(), async (req, res, next) => {
    let response = await generalSettingsController.filtersettings(req, res);
    res.send(response);
});


//saved search Saved_Searches_Property


router.post('/property/saved-searches', AuthMiddleware.authorization, async (req, res, next) => {
    let response = await savedSearchesPropertyController.store(req, res);
    res.send(response);
});

router.get('/property/saved-searches', AuthMiddleware.authorization, async (req, res, next) => {
    let response = await savedSearchesPropertyController.lists(req, res);
    res.send(response);
});

router.put('/property/saved-searches/:id', upload.none(), async (req, res, next) => {
    let response = await savedSearchesPropertyController.update(req, res);
    res.send(response);
});

router.get('/property/saved-searches/:userid', upload.none(), async (req, res, next) => {
    let response = await savedSearchesPropertyController.getbyuserId(req, res);
    res.send(response);
});


router.post('/device-token', AuthMiddleware.authorization, async (req, res, next) => {
    let dataRes = await DeviceTokenController.store(req, res);
    res.send(dataRes);
});

router.get('*', function (req, res) {
    res.status(404).send('Invalid API End Point');
});


module.exports = router;
