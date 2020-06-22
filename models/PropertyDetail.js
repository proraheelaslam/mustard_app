const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class PropertyDetail extends Sequelize.Model { }

PropertyDetail.init({
    property_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    picture_path: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    picture_type: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    picture_comment: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    fullImagePath: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.picture_path != '') {
                return `${constants.APP_URL}/upload/properties/${this.picture_path}`;
            }
        }
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
    sequelize, modelName: 'PropertyDetail', timestamps: false,
    tableName: 'property_details'
});

module.exports = PropertyDetail;