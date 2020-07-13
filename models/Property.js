const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const PropertyDetail = require('./PropertyDetail');
const PropertyLookupDetails = require('./PropertyLookupDetails');
const UserFavouriteProperty = require('./UserFavouriteProperty');


class Property extends Sequelize.Model { }
Property.init({

    User_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    No_Of_Rooms: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    No_Of_Bathrooms: {
        type: Sequelize.INTEGER,


        // allowNull defaults to true
    },
    Address: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Area: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Furnishing: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Property_type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Address_type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Bidding_status: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Rent: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Minimum_Rent: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Minimum_Resident_Days: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Moving_In_Date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Bidding_Close_Date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Tenant_Gender: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Tenant_Language: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Tenant_Smoker: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Tenanat_Pet: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Tenanat_Commuting_Time: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Property_URL: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Ad_Start_Date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Ad_End_Date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
}, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Property',
    tableName: 'Property'
});

Property.hasMany(PropertyDetail, {
    foreignKey: 'property_id',
    as: 'property_detail',
    onDelete: 'CASCADE'
});

Property.hasOne(UserFavouriteProperty, {
    foreignKey: 'property_id',
    onDelete: 'CASCADE',
    as: 'favourite_property',
});


Property.hasMany(PropertyLookupDetails, {
    foreignKey: 'Property_ID',
    as: 'PropertyLookupDetails',
    onDelete: 'CASCADE'
});

UserFavouriteProperty.belongsTo(Property, { foreignKey: 'property_id' });


module.exports = Property;