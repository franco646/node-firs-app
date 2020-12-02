const Sequelize = require('sequelize')

const sequelize = require('../routes/util/dataBase')

const OrderItem = sequelize.define('orderItem', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    cuenta: Sequelize.INTEGER
})

module.exports = OrderItem;