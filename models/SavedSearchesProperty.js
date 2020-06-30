const { sequelize, Sequelize, DataTypes } = require('./index');

class SavedSearchesProperty extends Sequelize.Model { }
SavedSearchesProperty.init({
    User_ID: {
        type: Sequelize.STRING,
    },
    API_String: {
        type: Sequelize.STRING,
    },
    Name: {
        type: Sequelize.STRING,
    }

}, {
    sequelize,
    paranoid: true,
    modelName: 'SavedSearchesProperty',
    timestamps: false,
    tableName: 'Saved_Searches_Property'
});

module.exports = SavedSearchesProperty;

