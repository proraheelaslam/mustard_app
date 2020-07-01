const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class DeviceToken extends Sequelize.Model { }

DeviceToken.init({
    device_token: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    fcm_token: {
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
    tableName: 'device_token'
},

);


module.exports = DeviceToken;