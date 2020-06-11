const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class User extends Sequelize.Model { }

User.init({
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    user_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    photo: {
        type: Sequelize.STRING,

        // allowNull defaults to true
    },

    phone_number: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    bankid: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    credit_report_path: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    linkedin: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    facebook: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    instagram: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    snapchat: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    dob: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    birth_place: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    annonymus_status: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    same_gender: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    status: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

}, {
    sequelize, modelName: 'User', timestamps: false,
    tableName: 'user'
},

);


module.exports = User;