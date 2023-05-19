const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CONNECT);

module.exports = {sequelize};