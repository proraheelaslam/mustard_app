const { sequelize, Sequelize, DataTypes } = require('./index');

class UserRating extends Sequelize.Model { }
UserRating.init({
    user_id: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.STRING,
    }

}, {
    sequelize,
    modelName: 'UserRating',
    timestamps: false,
    tableName: 'user_rating'
});

module.exports = UserRating;