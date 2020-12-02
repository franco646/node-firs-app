const Sequelize = require('sequelize') 

const sequelize = new Sequelize('basededatos', 'root', 'mortadela1', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;