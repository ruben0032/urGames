const Category = require("../models/category.js");

module.exports = {
    getCategory: async ()=>{

    },
    postCategory: async (categoria)=>{
        try {
            const {id} = categoria;
            const newCategory = await Category.create({ //create: metodo para crear nuevo juego
                id
            });
            if (!newCategory) {throw error}
            return newCategory;    
        } catch (error) {
            return {message: `No es posible crear una Categoria con esos datos`, code:404}
        }
    },
    putCategory: async ()=>{

    }
}
