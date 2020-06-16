const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Employment extends Sequelize.Model { }
Employment.init({
    name: {
        type: Sequelize.STRING,
    }

}, {
    sequelize, modelName: 'Employment', timestamps: false,
    tableName: 'employment'
});

module.exports = Employment;