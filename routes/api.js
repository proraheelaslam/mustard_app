const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const user = require('../controllers/user');
const address = require('../controllers/address');
const property = require('../controllers/property');
const birthplaceController = require('../controllers/BirthplaceController');

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
    let userData = await user.register(req, res);
    res.send(userData);
});

router.post('/users/sendCode', upload.none(), async (req, res, next) => {
    let userData = await user.sendCode(req, res);
    res.send(userData);
});

router.post('/address/create', upload.none(), async (req, res, next) => {
    let addressRes = await address.store(req, res);
    res.send(addressRes);
});

router.get('/address', upload.none(), async (req, res, next) => {
    let addressRes = await address.lists(req, res);
    res.send(addressRes);
});

router.post('/property/create', upload.none(), async (req, res, next) => {
    let propertyRes = await property.store(req, res);
    res.send(propertyRes);
});

router.get('/property/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.getPropertyByUser(req, res);
    res.send(propertyRes);
});

router.get('/propertyDetail/:id', upload.none(), async (req, res, next) => {
    let propertyRes = await property.getPropertyById(req, res);
    res.send(propertyRes);
});


router.post('/birthplace/create', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.store(req, res);
    res.send(response);
});

router.get('/birthplace', upload.none(), async (req, res, next) => {
    let response = await birthplaceController.lists(req, res);
    res.send(response);
});


module.exports = router;
