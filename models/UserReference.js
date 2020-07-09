const { sequelize, Sequelize, DataTypes } = require('./index');

class UserReference extends Sequelize.Model { }

UserReference.init({

    User_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Reference_Type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Reference_Name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Reference_Comments: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    Reference_Email: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },

    Refernce_Phone_Number: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },


    Is_Mustard_App_User: {
        type: Sequelize.STRING,
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

}, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'UserReference',
    tableName: 'User_References'
},

);


module.exports = UserReference;