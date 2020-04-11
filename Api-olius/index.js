var express = require('express');
var bodyParser = require('body-Parser');
var cors = require('cors');

//rutas
var usuariosRoutes = require("./routes/usuarios-routes");
var postsRoutes= require("./routes/post-routes")

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use("/usuarios", usuariosRoutes);
app.use("/posts",postsRoutes);

app.listen(8888, function () {
  console.log("servidor levantado");
});
