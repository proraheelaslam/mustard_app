const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const Property = require('./Property');

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
    comments: {
        type: Sequelize.STRING,
        allowNull: false
    },
    favourite: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    modelName: 'UserFavouriteProperty',
    timestamps: false,
    tableName: 'favourite_property'
});

module.exports = UserFavouriteProperty;