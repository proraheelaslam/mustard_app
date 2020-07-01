const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const PropertyDetail = require('./PropertyDetail');
const UserRating = require('./UserRating');

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
    fb_id: {
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

    gender: {
        type: Sequelize.STRING
    },

    same_gender: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    profile_image: {
        type: Sequelize.STRING,
    },

    home_address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    office_school_address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    other_address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    latitude: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    longitude: {
        type: Sequelize.INTEGER
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
},
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        tableName: 'user'
    },

);

User.hasOne(UserRating, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'user_rating',
});
module.exports = User;