const express = require("express");
const app = express();
const router = express.Router();    //Definir rutas
const categoryGameController = require("../controller/categoryGameController.js");

router.get("/", categoryGameController.getCategoryGame);

router.post("/", categoryGameController.postCategoryGame);

module.exports = router;