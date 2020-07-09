const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class TempLogin extends Sequelize.Model { }

TempLogin.init({
    Email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Phone_Number: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    Phone_Otp: {
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
    Email_Status: {
        type: Sequelize.INTEGER,
        // allowNull defaults to true
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    updatedAt: {
        type: 'TIMESTAMP',
        allowNull: true
    }

}, {
    sequelize,
    modelName: 'TempLogin',
    timestamps: false,
    tableName: 'Temp_Login'
},

);


module.exports = TempLogin;