const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretToken = 'mustaredapp';

const getCurrentUserInfo = (req) => {
    token = req.headers['authorization'];
    let bearerToken = token.split(' ');
    let brToken = bearerToken[1];
    const userinfo = jwt.decode(brToken, secretToken);
    if (userinfo.role == 'admin' || userinfo.role == 'pending') {
        let userdata = JSON.parse(userinfo.username);
        userdata['role'] = userinfo.role;
        userdata['iat'] = userinfo.iat;
        return userdata;
    }
    return userinfo;
};


let response = {};
response.getCurrentUserInfo = getCurrentUserInfo;
module.exports = response;