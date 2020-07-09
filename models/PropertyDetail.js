const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');

class PropertyDetail extends Sequelize.Model { }

PropertyDetail.init({
    Property_ID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Picture_Path: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Picture_Type: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    Picture_Comment: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    FullImagePath: {
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
    sequelize,
    modelName: 'PropertyDetail',
    timestamps: false,
    tableName: 'Property_Details'
});

module.exports = PropertyDetail;