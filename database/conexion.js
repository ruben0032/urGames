const {Sequelize} = require("sequelize");

const sequelize = new Sequelize( process.env.SEQ_DB , process.env.SEQ_USER, process.env.SEQ_PASS, {
    host: process.env.SEQ_HOST,
    dialect: 'postgres'
  });

module.exports = {sequelize};