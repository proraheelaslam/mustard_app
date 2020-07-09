const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const PropertyDetail = require('./PropertyDetail');
const UserRating = require('./UserRating');

class User extends Sequelize.Model { }

User.init({
    First_Name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    Last_Name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    User_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Phone_Number: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Bank_ID: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Credit_Report_Path: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Linkedin: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Facebook: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Instagram: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Snapchat: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    DOB: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Birth_Place_ID: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Fb_Id: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Employment_ID: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Annonymus_Status: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Gender: {
        type: Sequelize.STRING
    },

    Same_Gender: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Profile_Image: {
        type: Sequelize.STRING,
    },

    Home_Address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    Office_School_Address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    Other_Address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    Latitude: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },

    Longitude: {
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
        tableName: 'User'
    },

);

User.hasOne(UserRating, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'user_rating',
});
module.exports = User;