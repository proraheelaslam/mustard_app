const { sequelize, Sequelize, DataTypes } = require('./index');

class UserReference extends Sequelize.Model { }

UserReference.init({
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact_type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    reference_text: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    email: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    phone_number: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },

}, {
    sequelize, modelName: 'UserReference', timestamps: false,
    tableName: 'user_reference'
},

);


module.exports = UserReference;