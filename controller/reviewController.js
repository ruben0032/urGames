const reviewQuerys = require("../database/reviewQuery.js");

module.exports = {
    getReviews: async (req, res) => {
        try {

        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    postReview: async (req, res) => { // Funcion para crear 
        try {
            const {idUser, idGame, userName, score, content} = req.body;
            const validateReview = await reviewQuerys.getReviewGameByUser({idUser, idGame});
            if (validateReview.code) {
                res.send(validateReview)
            } else {
                const response = await reviewQuerys.postReview({idUser, idGame, userName, score, content});
                (response.code)
                    ? res.send(response)
                    : res.send({message:`La Reseña fué creado con éxito`, code:200});
            } 
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    getReviewUser: async (req, res)=> { // Para perfil usuario
        try {
            const {id} = req.headers;
            const response = await reviewQuerys.getReviewsByUser({id});
            res.json(response);
        } catch (error) {
            res.status(500).send({
                error: error.mesaage,
                code: 500
            });
        }
    },

    putReview: async (req, res) => {  // Editar datos (pendiente)
        try {

        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    }
    
};
