const Game = require("../models/game.js");
const Review = require("../models/review.js");
const {sequelize} = require("../database/conexion.js");
const { Op } = require("sequelize");

module.exports = {
    getGames: async ()=>{
        const games = await Game.findAll({ raw: true, order: [['createdAt','DESC']], limit: 9 });    //raw: metodo para entregar respuesta plana
        return games;
    },

    getGamesPage: async (page)=> {
        try {
            const set = page*9;
            const gamesPage = await Game.findAll({raw: true, order: [['createdAt','DESC']], offset: set, limit: 9});
            if (!gamesPage[0]) {throw error}
            return gamesPage;    
        } catch (error) {
            return {message: `No es posible mostrar mas Videojuegos`, code:404} 
        }
    },

    getGame: async (id)=>{
        try {
            const gameOne = await Game.findByPk(id,{include:{model: Review}});
            if (!gameOne) {throw error}
            return gameOne;
        } catch (error) {
            return {message: `No es posible mostrar Videojuego`, code:404}
        }
    },
    postGame: async (videojuego)=>{
        try {
            const {title, year, studio, urlImage, t} = videojuego;
            const newGame = await Game.create({ //create: metodo para crear nuevo juego
                title,
                year, 
                studio, 
                urlImage
            },{transaction: t});
            if (!newGame) {throw error}
            return newGame.id;    
        } catch (error) {
            return {message: `No es posible crear Videojuego con esos datos`, code:404}
        }
    },
    updateGame: async (videojuego)=>{
        try {
            const {id, year, urlImage} = videojuego;
            const updateGame = await Game.update({
                year: year, urlImage:urlImage
            },{where:{id: id}});
            if (!updateGame) {throw error}
            return updateGame;
        } catch (error) {
            return {message: `No es posible modificar Videojuego con esos datos`, code:404}
        }
    },
    getGameByTitle: async (videojuego)=> {
        try {
            const {title} = videojuego;
            const seachGame = await Game.findAll({
                order: [['createdAt','DESC']],
                where:{title:{[Op.substring]:title}}
            });
            if (!seachGame[0]) {throw error}
            return seachGame;
        } catch (error) {
            return {message: `No es posible encontrar el Videojuego`, code:404}
        }
    }
}
