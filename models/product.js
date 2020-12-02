const sequelize = require("../routes/util/dataBase");

const Sequelize = require('sequelize');

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: Sequelize.STRING,
  imagenUrl: {
    allowNull: false,
    type: Sequelize.STRING
  },
  descripcion: {
    allowNull: false,
    type: Sequelize.STRING
  },
  precio: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

module.exports = Product;