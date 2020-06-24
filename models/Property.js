const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');
const PropertyDetail = require('./PropertyDetail');
const UserFavouriteProperty = require('./UserFavouriteProperty');


class Property extends Sequelize.Model { }
Property.init({

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    no_of_rooms: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    no_of_bathrooms: {
        type: Sequelize.INTEGER,


        // allowNull defaults to true
    },
    address: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    area: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    furnishing: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    property_type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    bidding_status: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    rent: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    minimum_rent: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    minimum_resident_days: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    moving_in_date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    bidding_close_date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    tenant_gender: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    tenant_language: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    tenant_smoker: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    tenanat_pet: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    tenanat_commuting_time: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    property_url: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    ad_start_date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    ad_end_date: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
        // allowNull defaults to true
    },
    lat: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    long: {
        type: Sequelize.STRING
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
    tableName: 'properties'
});

Property.PropertyDetail = Property.hasMany(PropertyDetail, {
    foreignKey: 'property_id',
    as: 'property_detail',
    onDelete: 'CASCADE'
});
Property.UserFavouriteProperty = Property.hasOne(UserFavouriteProperty, {
    foreignKey: 'property_id',
    onDelete: 'CASCADE',
    as: 'favourite_property',
});

module.exports = Property;