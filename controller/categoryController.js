const categoryQuerys = require("../database/categoryQuery.js");

module.exports = {
    getCategorys: async (req, res) => { 
        try {

        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    postCategory: async (req, res) => { // Funcion para crear 
        try {
            const {id} = req.body;
            const response = await categoryQuerys.postCategory({id});
            (response.code)
                ? res.send(response)
                : res.send({message:`La Categoria fué creado con éxito`, code:200});         
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    },

    putCategory: async (req, res) => {  // Editar datos (pendiente)
        try {

        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    }
    
};
