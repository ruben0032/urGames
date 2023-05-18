const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('gamesprueba', 'postgres', 'post4u', {
    host: 'localhost',
    dialect: 'postgres'
});



module.exports = {sequelize};