const gameQuerys = require("../database/gameQuery.js");
const categoryGameQuerys = require("../database/categoryGameQuery.js")
const {sequelize} = require("../database/conexion.js");
const reviewQuerys = require("../database/reviewQuery.js");
const { getReviews } = require("./reviewController.js");


module.exports = {
    getGames: async (req, res) => {  //Funcion para ruta principal
        try {
            const response = await gameQuerys.getGames();
            res.render("home",{response});    
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    getNewPage: async (req, res)=> {
        try {
            const {page} = req.headers;
            const response = await gameQuerys.getGamesPage(page);
            res.json(response); //Para envio de array directo con formato json
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            });
        }
    },

    getGame: async (req, res)=>{
        try {
            let promedio = 0;   //Variable para calcular valoracion de reseñas
            let reseñas = [];
            const {id} = req.params; 
            const response = await gameQuerys.getGame(id);  //recibir informacion del juego
            if (response.reviews[0]) {
                response.reviews.forEach(e => {
                    promedio = promedio + e.score;
                    reseñas.push({...e.dataValues});
                });
                promedio = (promedio / (response.reviews.length)).toFixed(1);    
            } else {
                promedio = false;
            }
            const juego = {...response.dataValues};
            (response.code) //En caso de la respuesta presente un error
            ? res.send(response)
            : res.render("gameInfo", {juego, reseñas, promedio});
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    postGame: async (req, res) => { //Funcion para crear game
        const t = await sequelize.transaction();    //Metodo sequalize para realizar transaccion
        try {
            let queryError = false;
            const {title, description, publicDate, studio, urlImage, listCategory} = req.body;
            const gameId = await gameQuerys.postGame({title, description, publicDate, studio, urlImage, t});
            for (let index = 0; index < listCategory.length; index++) { //enviar info a categoryGame
                let categoryId = listCategory[index];
                let response = await categoryGameQuerys.postCategoryGame({gameId, categoryId, t})
                if (response.code || gameId.code) {
                    queryError = true;
                }               
            };
            if (queryError) {
                await t.rollback();
                res.send({message: `No es posible asignar esta Categoria al Juego`, code:404})
            } else {
                await t.commit();
                res.send({message:`El Videojuego fué creado con éxito`, code:200});
            }
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    putGame: async (req, res) => {  //Editar datos de game
        try {
            const {id, publicDate, urlImage} = req.body;
            const updateGame = await gameQuerys.updateGame({id, publicDate, urlImage});
            if (updateGame.code) {
                res.send({message:`No fué posible editar el Videojuego`, code:404});
            } else {
                res.send({message:`El Videojuego fué editado con éxito`, code:200});
            }
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    gameByTitle: async (req, res)=> {
        try {
            const {title} = req.headers;
            const gamesFinds = await gameQuerys.getGameByTitle({title});
            res.json(gamesFinds);
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            }) 
        }
    }
    
};

