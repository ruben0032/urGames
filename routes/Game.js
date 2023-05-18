const express = require("express");
const app = express();
const router = express.Router();    //Definir rutas
const gameController = require("../controller/gameController.js");

// router.get("/", gameController.getGames);

router.get("/:id", gameController.getGame);

router.get("/page/next", gameController.getNewPage);

router.post("/", gameController.postGame);

router.put("/", gameController.putGame);

router.get("/api/seach", gameController.gameByTitle);

module.exports = router;