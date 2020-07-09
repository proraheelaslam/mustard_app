const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const Property = require('./Property');

class UserFavouriteProperty extends Sequelize.Model { }

UserFavouriteProperty.init({
    Property_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    User_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Comments: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Favourite: {
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
    tableName: 'Favourite_Property'
});

module.exports = UserFavouriteProperty;