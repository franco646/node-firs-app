const Sequelize = require('sequelize')

const sequelize = require('../routes/util/dataBase')

const CartItem = sequelize.define('cartItem', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    cuenta: Sequelize.INTEGER
})

module.exports = CartItem;