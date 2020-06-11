const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class TempLogin extends Sequelize.Model {}

TempLogin.init({

        Email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
        Phone_number: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
        Phone_OTP: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
        Email_Link: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
        Phone_Status: {
        type: Sequelize.INTEGER,

        // allowNull defaults to true
    },
        Email_status: {
        type: Sequelize.INTEGER,

        // allowNull defaults to true
    },




    }, {
    sequelize, modelName: 'TempLogin',  timestamps: false,
    tableName:'temp_login' },

    );


module.exports = TempLogin;