const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Employment extends Sequelize.Model { }
Employment.init({
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
    modelName: 'Employment',
    tableName: 'employment'
});

module.exports = Employment;