const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Address extends Sequelize.Model { }
Address.init({
    Name: {
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
    sequelize,
    modelName: 'Address',
    timestamps: false,
    tableName: 'Addresses'
});

module.exports = Address;