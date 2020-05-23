var express = require('express');
var bodyParser = require('body-Parser');
var cors = require('cors');

//rutas
var usuariosRoutes = require("./routes/usuarios-routes");
var postsRoutes = require("./routes/post-routes");
var categoriasRoutes = require("./routes/categorias-routes");
var archivosRoutes = require("./routes/archivos-routes");
var paginasRoutes = require("./routes/paginas-routes");
var temasRoutes = require("./routes/temas-routes");
var configuracionRoutes = require("./routes/configuracion-routes");
var comentariosRoutes = require("./routes/comentarios-routes");
var menusRoutes = require("./routes/menus-routes");


var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//archivos staticos
app.use(express.static('public'));


app.use("/usuarios", usuariosRoutes);
app.use("/posts", postsRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/archivos", archivosRoutes);
app.use("/paginas", paginasRoutes);
app.use("/temas", temasRoutes);
app.use("/configuracion", configuracionRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/menus", menusRoutes);


app.listen(8888, function () {
  console.log("servidor levantado");
});
