const { sequelize, Sequelize, DataTypes } = require('./index');

class PropertyLookupDetails extends Sequelize.Model { }

PropertyLookupDetails.init({
    Property_ID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Lookup_Property_ID: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Value: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    }

}, {
    sequelize,
    modelName: 'PropertyLookupDetails',
    timestamps: false,
    tableName: 'Property_Lookup_Details'
});

module.exports = PropertyLookupDetails;