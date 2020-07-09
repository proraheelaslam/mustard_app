const { sequelize, Sequelize, DataTypes } = require('./index');

class UserDetail extends Sequelize.Model { }

UserDetail.init({
    User_ID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Language: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Smoker: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    Pets: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Co_Applicant_Preference: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Diet: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Commuting_Distance: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Party_Habits: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Nightly_Guests: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Get_Up: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Sleep_Time: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Abount_Me: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Profile_Image: {
        type: Sequelize.STRING,
        // allowNull defaults to true
    },
    Home_Address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Office_School_Address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Other_Address: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Lat: {
        type: Sequelize.INTEGER
        // allowNull defaults to true
    },
    Long: {
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
    tableName: 'User_Details'
});

module.exports = UserDetail;