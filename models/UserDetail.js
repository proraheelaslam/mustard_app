const { sequelize, Sequelize, DataTypes } = require('./index');

class UserDetail extends Sequelize.Model { }

UserDetail.init({
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    language: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    smoker: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    pets: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    co_applicant_preference: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    diet: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    commuting_distance: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    party_habits: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    nightly_guests: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    get_up: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    sleep_time: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    nightly_guests: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    abount_me: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    profile_image: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    home_address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Office_school_address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    other_address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    lat: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    long: {
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
    modelName: 'UserDetail',
    timestamps: false,
    tableName: 'user_details'
});

module.exports = UserDetail;