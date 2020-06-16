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


router.post('/users/register', upload.none(), async (req, res, next) => {
    let userData = await userController.register(req, res);
    res.send(userData);
});

router.post('/users/update-profile/:id', upload.none(), async (req, res, next) => {
    let userData = await userController.update(req, res);
    res.send(userData);
});


router.post('/send-invitation', upload.none(), async (req, res, next) => {
    let userData = await tempLogin.sendInvitation(req, res);
});

router.post('/resend-invitation', upload.none(), async (req, res, next) => {
    let userData = await tempLogin.resendInvitation(req, res);
});

router.post('/user/reference/create', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.store(req, res);
    res.send(response);
});

router.get('/user/reference/:id', upload.none(), async (req, res, next) => {
    let response = await userReferenceContoller.lists(req, res);
    res.send(response);
});


router.post('/address/create', upload.none(), async (req, res, next) => {
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

router.post('/property/create', upload.none(), async (req, res, next) => {
    let propertyRes = await property.store(req, res);
    res.send(propertyRes);
});

router.get('/property/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.getPropertyByUser(req, res);
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

router.post('/birthplace/create', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.store(req, res);
    res.send(response);
});

router.get('/birthplace', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.lists(req, res);
    res.send(response);
});


router.post('/employment/create', upload.none(), async (req, res, next) => {
    let response = await employmentController.store(req, res);
    res.send(response);
});

router.get('/employment', upload.none(), async (req, res, next) => {
    let response = await employmentController.lists(req, res);
    res.send(response);
});

router.post('/general/filters/settings', upload.none(), async (req, res, next) => {
    let response = await generalSettingsController.lists(req, res);
    res.send(response);
});





module.exports = router;
