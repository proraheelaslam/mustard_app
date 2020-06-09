const { sequelize, Sequelize, DataTypes } = require('./index');
const constants = require('../utils/constants');


class Category extends Sequelize.Model {}
Category.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    image: {
        type: Sequelize.STRING,


        // allowNull defaults to true
    },
    status: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    fullImagePath: {

        type: DataTypes.VIRTUAL,
        get() {
            if (this.image != '') {
                return `${constants.APP_URL}/upload/categories/${this.image}`;
            }
        }
    }

}, {
    sequelize, modelName: 'Category',  timestamps: false,
    tableName:'categories' });

module.exports = Category;