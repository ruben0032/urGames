const {DataTypes} = require("sequelize");
const {sequelize} = require("../database/conexion.js");
const Review = require("./review.js");

// Crear modelo de usuario
const User = sequelize.define("user", { // define:metodo para crear tablas en db
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {isEmail:true},
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    access:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

//metodo para establecer fk
User.hasMany(Review, {
    foreignKey: 'idUser',
    sourceKey: 'id'
});

//relacional fk
Review.belongsTo(User,{
    foreignKey: 'idUser',
    targetId: 'id'
});

module.exports = User;
