const { sequelize, Sequelize, DataTypes } = require('./index');

class UserReference extends Sequelize.Model { }

UserReference.init({

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    reference_type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    reference_name: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    reference_comments: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },

    reference_email: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },

    refernce_phone_number: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },


    is_mustard_app_user: {
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
    tableName: 'user_references'
},

);


module.exports = UserReference;