const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class TempLogin extends Sequelize.Model {}

TempLogin.init({

    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    phone_number: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    phone_otp: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
     email_link: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    phone_status: {
        type: Sequelize.INTEGER,

        // allowNull defaults to true
    },
        email_status: {
        type: Sequelize.INTEGER,

        // allowNull defaults to true
    },




    }, {
    sequelize, modelName: 'TempLogin',  timestamps: false,
    tableName:'temp_login' },

    );


module.exports = TempLogin;