

const successResponse = (message, data = []) => {
    let res = {};
    res.status = true;
    res.code = 200;
    res.message = message;
    res.data = data;
    return res;
};

const validationResponse = (message, data = []) => {
    let res = {};
    res.status = false;
    res.code = 400;
    res.message = message;
    res.data = [];
    return res;
};

const notFoundResponse = (message, data = []) => {

    let res = {};
    res.status = false;
    res.code = 404;
    res.message = message;
    res.data = data;
    return res;
};


const errorResponse = (e) => {
    let res = {};
    res.status = false;
    res.code = 500;
    res.message = 'Internal Server Error ';
    res.error = e;
    res.data = [];
    return res;
};


const responseValidator = (data = []) => {
    res.data = data.map(r => {
        delete r['deletedAt'];
        return r;
    });
    return res;
};

let response = {};
response.successResponse = successResponse;
response.errorResponse = errorResponse;
response.notFoundResponse = notFoundResponse;
response.validationResponse = validationResponse;
response.responseValidator = responseValidator;
module.exports = response;