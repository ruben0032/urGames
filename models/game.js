const {DataTypes} = require("sequelize");
const {sequelize} = require("../database/conexion.js");
const Review = require("./review.js");

//Crear modelo de usuario
const Game = sequelize.define("game", { //define:metodo para crear tablas en db
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    studio:{
        type: DataTypes.STRING,
        allowNull: false
    },
    urlImage:{
        type: DataTypes.TEXT,
        allowNull: false
    }
});

//metodo para establecer fk
Game.hasMany(Review, {
    foreignKey: 'idGame',
    sourceKey: 'id'
});

//relacional fk
Review.belongsTo(Game,{
    foreignKey: 'idGame',
    targetId: 'id'
});

module.exports = Game;
