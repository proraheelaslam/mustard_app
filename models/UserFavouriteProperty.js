const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class UserFavouriteProperty extends Sequelize.Model { }

UserFavouriteProperty.init({
    property_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    favourite: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },

}, {
    sequelize,
    modelName: 'UserFavouriteProperty',
    timestamps: false,
    tableName: 'user_favourite_property'
});

module.exports = UserFavouriteProperty;