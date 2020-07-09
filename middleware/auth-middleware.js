const jwt = require('jsonwebtoken');
const secretToken = 'mustaredapp';

var authorization = function (req, res, next) {
    // Get auth header value
    var token = req.headers['authorization'];
    var msg = { status: false, message: 'No Authorization token provided.' };
    if (!token) return res.status(401).send(msg);
    let bearerToken = token.split(' ');
    let brToken = bearerToken[1];
    const decoded = jwt.verify(brToken, secretToken);
    jwt.verify(brToken, secretToken, function (err, decoded) {
        var msg = { status: false, message: 'Failed to authenticate token.' };
        if (err) {
            return res.status(401).send(msg);
        } else if (decoded.role == 'guest') {
            var msg = { status: false, message: 'You are not allowed to performed specifiec action' };
            return res.status(401).send(msg);
        }
        req.token = brToken;
        next();
    });

}

var guestauthorization = function (req, res, next) {
    // Get auth header value
    var token = req.headers['authorization'];
    var msg = { status: false, message: 'No Authorization token provided.' };
    if (!token) return res.status(401).send(msg);
    let bearerToken = token.split(' ');
    let brToken = bearerToken[1];
    const decoded = jwt.verify(brToken, secretToken);
    // console.log('decoded', decoded);

    jwt.verify(brToken, secretToken, function (err, decoded) {
        var msg = { status: false, message: 'Failed to authenticate token.' };
        if (err) {
            return res.status(401).send(msg);
        }
        req.token = brToken;
        next();
    });

}

let AuthMiddleware = {};
AuthMiddleware.guestauthorization = guestauthorization;
AuthMiddleware.authorization = authorization;
module.exports.AuthMiddleware = AuthMiddleware;