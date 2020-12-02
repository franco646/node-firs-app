const sequelize = require('../routes/util/dataBase')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
    /*
    passeword: {
        type: Sequelize.TEXT,
        allowNull: false
    }
    */
})

module.exports = User