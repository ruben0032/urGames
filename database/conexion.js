const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_CON
);



module.exports = {sequelize};