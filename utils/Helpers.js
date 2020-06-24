const jwt = require('jsonwebtoken');

const getCurrentUserInfo = (req) => {
    token = req.headers['authorization'];
    let bearerToken = token.split(' ');
    let brToken = bearerToken[1];
    const decode = jwt.decode(brToken, 'youraccesstokensecret');
    return decode;
};


let response = {};
response.getCurrentUserInfo = getCurrentUserInfo;
module.exports = response;