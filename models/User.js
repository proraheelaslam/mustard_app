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

    profile_image: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },

    phone_number: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    bank_id: {
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

    birth_place_id: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    employment_id: {
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

    address: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lat: {
        type: Sequelize.STRING,
        allowNull: false
    },

    long: {
        type: Sequelize.STRING,
        allowNull: false
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
    sequelize, modelName: 'User', timestamps: false,
    tableName: 'user'
},

);


module.exports = User;