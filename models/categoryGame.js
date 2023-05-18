const {DataTypes} = require("sequelize");
const {sequelize} = require("../database/conexion.js");
const Game = require("./game.js");
const Category = require("./category.js");


const CategoryGame = sequelize.define('categoryGame', {
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game, 
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.STRING,
      references: {
        model: Category,
        key: 'id'
      }
    }
});

//Relación muchos a muchos
Game.belongsToMany(Category, { through: CategoryGame });
Category.belongsToMany(Game, { through: CategoryGame });

module.exports = CategoryGame;