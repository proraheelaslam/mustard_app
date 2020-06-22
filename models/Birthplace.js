const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class Birthplace extends Sequelize.Model { }

Birthplace.init({
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
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Birthplace',
    tableName: 'birthplace'
});

module.exports = Birthplace;