const jwt = require('jsonwebtoken');

var authorization = function (req, res, next) {
    // Get auth header value
    var token = req.headers['authorization'];
    var msg = { status: false, message: 'No Authorization token provided.' };
    if (!token) return res.status(401).send(msg);
    let bearerToken = token.split(' ');
    let brToken = bearerToken[1];
    const decoded = jwt.verify(brToken, 'youraccesstokensecret');
    console.log('decoded', decoded);

    jwt.verify(brToken, 'youraccesstokensecret', function (err, decoded) {
        var msg = { status: false, message: 'Failed to authenticate token.' };
        if (err) {
            return res.status(401).send(msg);
        }
        req.token = brToken;
        next();
    });

}


let AuthMiddleware = {};
AuthMiddleware.authorization = authorization;

module.exports.AuthMiddleware = AuthMiddleware;