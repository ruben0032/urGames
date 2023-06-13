const {DataTypes} = require("sequelize");
const {sequelize} = require("../database/conexion.js");

// Crear modelo
const Review = sequelize.define("review", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            max:10,
            min:1
        }
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});


module.exports = Review;
