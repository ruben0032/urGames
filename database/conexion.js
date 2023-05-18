const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_LINK
);



module.exports = {sequelize};