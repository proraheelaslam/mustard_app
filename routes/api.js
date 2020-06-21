const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const tempLogin = require('../controllers/tempLoginController');
const userController = require('../controllers/userController');
const address = require('../controllers/addressController');
const property = require('../controllers/propertyController');
const propertyDetailController = require('../controllers/propertyDetailController');
const birthplaceController = require('../controllers/birthplaceController');
const userReferenceContoller = require('../controllers/userReferenceContoller');
const employmentController = require('../controllers/employmentController');
const generalSettingsController = require('../controllers/generalSettingsController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/categories');

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });

/* API Routes */

router.get('/user/:id', upload.none(), async (req, res, next) => {
    let userData = await userController.show(req, res);
    res.send(userData);
});

router.post('/user', upload.none(), async (req, res, next) => {
    let userData = await userController.register(req, res);
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

router.get('/property', upload.none(), async (req, res, next) => {
    let propertyRes = await property.lists(req, res);
    res.send(propertyRes);
});

router.post('/property', upload.none(), async (req, res, next) => {
    let propertyRes = await property.store(req, res);
    res.send(propertyRes);
});

router.put('/property/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.update(req, res);
    res.send(propertyRes);
});

router.get('/user-property/:user_id/:active', upload.none(), async (req, res, next) => {
    let propertyRes = await property.getPropertyByUserId(req, res);
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

router.post('/property/discover', upload.none(), async (req, res, next) => {
    let propertyRes = await property.discover(req, res);
    res.send(propertyRes);
});

router.get('/property-detail/:id', upload.none(), async (req, res, next) => {
    let response = await propertyDetailController.index(req, res);
    res.send(response);
});

router.post('/property-detail/create', upload.none(), async (req, res, next) => {
    let response = await propertyDetailController.store(req, res);
    res.send(response);
});

router.post('/birthplace', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.store(req, res);
    res.send(response);
});

router.get('/birthplace', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.lists(req, res);
    res.send(response);
});

router.delete('/birthplace/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await birthplaceController.destroy(req, res);
    res.send(propertyRes);
});


router.post('/employment', upload.none(), async (req, res, next) => {
    let response = await employmentController.store(req, res);
    res.send(response);
});

router.put('/employment/:id', upload.none(), async (req, res, next) => {
    let response = await employmentController.update(req, res);
    res.send(response);
});


router.get('/employment', upload.none(), async (req, res, next) => {
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
    let response = await generalSettingsController.lists(req, res);
    res.send(response);
});

router.get('*', function (req, res) {
    res.status(404).send('Invalid API End Point');
});


module.exports = router;
