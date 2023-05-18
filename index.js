const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User.js");
const gameRoutes = require("./routes/Game.js");
const reviewRoutes = require("./routes/Review.js");
const categoryRoutes = require("./routes/Category.js");
const {sequelize} = require("./database/conexion.js");
const gameController = require("./controller/gameController.js");



app.use(bodyParser.urlencoded({extended: true}))    //Integrar body parser
app.use(bodyParser.json());

app.set("view engine", "handlebars");   //Integrar handlebars
app.engine("handlebars", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/mainLayout`,
    partialsDir: __dirname + "/views/components/"
}));

app.use(express.static(__dirname + "/public")); //Establecer carpeta publica

app.get("/", gameController.getGames)

app.use("/user", userRoutes);   //agregar ruta importada en la app

app.use("/game", gameRoutes);

app.use("/review", reviewRoutes);

app.use("/category", categoryRoutes);



app.listen(3000, async()=> {
  //Establecer conexion con sequalize
    try {
        await sequelize.sync({force: false});  //false: crea las tablas si no existen
        console.log('Connection has been established successfully.');
        console.log("Server ON")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});

