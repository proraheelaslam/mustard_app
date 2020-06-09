const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class User extends Sequelize.Model {}

User.init({
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },
    photo: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },



}, {
    sequelize, modelName: 'User',  timestamps: false,
    tableName:'users' },

    );


module.exports = User;