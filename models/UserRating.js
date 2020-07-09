const { sequelize, Sequelize, DataTypes } = require('./index');

class UserRating extends Sequelize.Model { }
UserRating.init({
    User_ID: {
        type: Sequelize.STRING,
    },
    Value: {
        type: Sequelize.STRING,
    }

}, {
    sequelize,
    modelName: 'UserRating',
    timestamps: false,
    tableName: 'User_Rating'
});

module.exports = UserRating;