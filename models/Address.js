const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Address extends Sequelize.Model { }
Address.init({
    name: {
        type: Sequelize.STRING,
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
    sequelize, modelName: 'Address', timestamps: false,
    tableName: 'addresses'
});

module.exports = Address;