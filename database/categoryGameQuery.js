const CategoryGame = require("../models/categoryGame.js");

module.exports = {
    getCategorysGame: async ()=>{

    },
    postCategoryGame: async (categoriaJuego)=>{
        try {
            const {gameId, categoryId, t} = categoriaJuego;
            const newCategoryGame = await CategoryGame.create({ //create: metodo para crear nuevo juego
                gameId,
                categoryId
            },{transaction: t});
            console.log(newCategoryGame);
            if (!newCategoryGame) {throw error}
            return newCategoryGame;    
        } catch (error) {
            return {message: `No es posible asignar esta Categoria al Juego`, code:404}
        }
    },
    putCategoryGame: async ()=>{

    }
}
