const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class DeviceToken extends Sequelize.Model { }

DeviceToken.init({
    Device_Token: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Device_os: {
        type: Sequelize.STRING,
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
    modelName: 'DeviceToken',
    timestamps: true,
    tableName: 'Device_Token'
},

);


module.exports = DeviceToken;