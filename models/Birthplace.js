const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class Birthplace extends Sequelize.Model { }

Birthplace.init({
    name: {
        type: Sequelize.STRING,
    }

}, {
    sequelize, modelName: 'Birthplace', timestamps: false,
    tableName: 'birthplace'
});

module.exports = Birthplace;