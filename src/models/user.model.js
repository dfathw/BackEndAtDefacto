const Sequelize = require('sequelize');
const connection = require('../../config/dbConn');

const User = connection.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    tableName: 'user',
    paranoid: true,
});

module.exports = User;