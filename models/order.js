const Sequelize = require('sequelize')

const sequelize = require('../routes/util/dataBase')

const Order = sequelize.define('orders', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }
})

module.exports = Order;