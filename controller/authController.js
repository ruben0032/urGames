const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const jwtKey = "ClaveTemporalJWT";
const jwtExpirySeconds = 1800;  // 1/2hr
const { getUser } = require("../database/userQuery.js");
const hash = require("../util/hash.js");



module.exports = {    
    initSesion: async (req, res) => {
        try {
            const {email, password} = req.body;
            const response = await getUser({email});
            const {id, access} = response;  //para token
            const hashPass = response.password;
            const compare = await hash.comparePass(password, hashPass);
            if (response.code) {    //En caso de que ususario no exista o password
                res.send(response);
            } else if (compare.code) {
                res.send(compare);
            } else {
                const token = jwt.sign( //Generar token
                    {
                        exp: Math.floor(Date.now()/1000)+jwtExpirySeconds,
                        data: {id, access}
                    },
                    jwtKey
                );
                res.send({token: token, infoUser: {id: response.id, userName: response.name}, code:200}) 
            }
        } catch (error) {
            res.status(500).send({
                error: error.message,
                code:500
            })
        }
    }
};



