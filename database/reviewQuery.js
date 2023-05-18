const Review = require("../models/review.js");

module.exports = {
    getReviews: async (id)=>{
        try {
            const {count, rows} = await Review.findAndCountAll({where:{idGame:id}, raw: true});
            if (!rows[0]) {throw error}
            return {count, rows};
        } catch (error) {
            return {message: `No es posible mostrar las reseñas del Videojuego`, code:404}
        }
    },
    getScoresSum: async (id)=>{
        try {
            const scoreSum = await Review.sum('score', { where: {idGame:id}});
            if (!scoreSum) {throw error};
            return scoreSum;
        } catch (error) {
            return {message: `No es posible mostrar las reseñas del Videojuego`, code:404}
        }
    },
    postReview: async (reseña)=>{
        try {
            const {idUser, idGame, userName, score, content} = reseña;
            const newReview = await Review.create({ //create: metodo para crear nuevo juego
                idUser, 
                idGame,
                userName, 
                score, 
                content
            });
            if (!newReview) {throw error}
            return newReview;    
        } catch (error) {
            return {message: `No es posible crear Reseña con esos datos`, code:404}
        }
    },
    getReviewGameByUser: async(reviewToValidate)=> {    //Verificar si usuario ya ha hecho reseña para ese juego
        try {
            const {idUser, idGame} = reviewToValidate;
            const reviewValidate = await Review.findOne({
                where: {
                    idUser: idUser,
                    idGame: idGame
                },
                raw: true});
            if (reviewValidate) {throw error}
            return true;
        } catch (error) {
            return {message: `Ya se ha realizado una reseña para este juego`, code:405}
        }
    },
    getReviewsByUser: async (user)=>{ //Para perfil de usuario
        try {
            const {id} = user;
            const reviewsUser = await Review.findAll({where:{idUser:id}, raw: true});
            if (!reviewsUser[0]) {throw error}
            return reviewsUser;
        } catch (error) {
            return {message: `No es posible mostrar las reseñas del Usuario`, code:404}
        }
    },
    
    putReview: async ()=>{

    }
}
