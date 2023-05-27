const express = require("express");
const app = express();
const router = express.Router();    //Definir rutas
const userController = require("../controller/userController.js");
const authController = require("../controller/authController.js");
const jwt = require("jsonwebtoken");
const jwtKey = "ClaveTemporalJWT";

router.use("*/:idUser/:token", (req, res, next)=>{  //middleware para token
    try {
        const {token, idUser} = req.params;
        let decoded = jwt.verify(token, jwtKey);
        if (decoded.data.id !== Number(idUser)) {
            throw new Error()
        }
        next();   
    } catch (error) {
        res.redirect("/")
    }
})

// router.get("/verify", userController.getUsers); //Eliminar al final

router.post("/", userController.postUser);

router.put("/", userController.putUser);

router.post("/login", authController.initSesion);

router.get("/sesion", userController.initSesion);

router.get("/signin", userController.signUser);

router.get("/:idUser/:token", userController.getProfile);


module.exports = router;