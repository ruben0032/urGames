const User = require("../models/user.js");
const hash = require("../util/hash.js");

module.exports = {

    postUser: async (usuario)=>{
        try {
            let {email, password, name} = usuario
            const passHash = await hash.hashPass(password); //Hasheo password
            password = passHash
            if (passHash.code) {
                throw error
            };
            const newUser = await User.create({ //create: metodo para crear nuevo usuario
                email, 
                password, 
                name
            });
            console.log(newUser);
            if (!newUser) {
                throw error
            }
            return newUser;    
        } catch (error) {
            return {message: `No es posible crear Usuario con esos datos`, code:404}
        }
    },
    putUser: async (usuario)=>{
        try {
            const {id, email, password, name} = usuario;
            const updateUser = await User.findByPk(id); //findPK: metodo para traer usuario segun pk
            if (!updateUser) {throw error}
            //reemplazando los valores del usuario
            updateUser.email = email;
            updateUser.password = password;
            updateUser.name = name;
            //guardar datos
            await updateUser.save();   //save: metodo para guardar cambios
            return updateUser;    
        } catch (error) {
            return {message: `Usuario invalido`, code:404}
        }
    },
    getUser: async (usuario)=>{
        try {
            const {email} = usuario;  //descomponer información
            const user = await User.findOne({   //buscar un usuario
                where: {email: email},
                raw: true   //raw: metodo para entregar respuesta plana
            });    
            if (!user) {throw error}
            return user;
        } catch (error) {
            return {message: `Datos de usuario incorrectos`, code:404}
        }
    },
    getUserProfile: async (usuario)=> {  //Acceder a info de usuario para su perfil
        try {
            const {idUser} = usuario;
            const userProfile = await User.findOne({
                where:{id: idUser},
                raw: true
            });
            if (!userProfile) {throw error}
            return userProfile;
        } catch (error) {
            return {message: `Usuario sin acceso`, code:404} 
        }
    }

}