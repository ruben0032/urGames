const {DataTypes} = require("sequelize");
const {sequelize} = require("../database/conexion.js");

//Crear modelo
const Category = sequelize.define("category", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
});

module.exports = Category;



