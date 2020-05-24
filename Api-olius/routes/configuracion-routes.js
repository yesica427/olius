var express = require("express");
var router = express.Router();
const multer = require('multer');
const path = require("path");
var fs = require("fs");


/*conexion mongodb*/
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useUnifiedTopology: true
});
conectarse(client).catch(console.error);
//funcion que hace la conexion, la llamo arriba
async function conectarse(client) {

  try {
    await client.connect();

  } catch (e) {
    console.error(e);
  } finally {
    //await client.close();
  }
}


/*crear*/

router.post('/', async function (req, res) {

  const result = await client.db("Olius").collection("configuracion").insertOne(req.body);

  res.send(result.ops[0]);

  if (req.params.nombre == "encabezado") {

    // sobreescribir los archivos css 
    fs.writeFile('./public/estilos/estilos_encabezado.css', req.body.css, (err) => {
      if (err) throw err;
    });
  } else {

    // sobreescribir los archivos css 
    fs.writeFile('./public/estilos/estilos_footer.css', req.body.css, (err) => {
      if (err) throw err;
    });
  }

})


/*obtener un documento por nombre*/

router.get('/:nombre', async function (req, res) {


  console.log(req.params.nombre);

  var result = await client.db("Olius").collection("configuracion")
    .findOne({
      "nombre": req.params.nombre
    });

  res.send(result);

})




/*editar */
router.put('/:nombre', async function (req, res) {

  console.log(req.params.nombre)

  result = await client.db("Olius").collection("configuracion")
    .updateOne({
      "nombre": req.params.nombre
    }, {
      $set: req.body
    });

  if (req.params.nombre == "encabezado") {

    // sobreescribir los archivos css 
    fs.writeFile('./public/estilos/estilos_encabezado.css', req.body.css, (err) => {
      if (err) throw err;
    });
  } else {

    // sobreescribir los archivos css 
    fs.writeFile('./public/estilos/estilos_footer.css', req.body.css, (err) => {
      if (err) throw err;
    });
  }

  res.send(result.result)
})


const DIR = './public/configuracion/';


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log(req.body)

    cb(null, file.originalname);
  }
});

let upload = multer({
  storage: storage
});


/*cambiar favicon*/
router.put('/modificar/favicon', upload.single('file'), async (req, res, next) => {

  if (!req.file) {
    console.log("Your request doesn’t have any file");
    return res.send({
      success: false
    });
  }

  //traer  pagina actual, la url 1
  var result = await client.db("Olius").collection("paginas")
    .findOne({
      "url": 1
    });

  //console.log(result)

  var nombreFavicon = result.favicon.split("/");

  //borrar favicon
  fs.unlink('public/configuracion/' + nombreFavicon[nombreFavicon.length - 1], (err) => {
    if (err) throw err;
  });


  //renombrar archivo favicon
  var extensionFavicon = req.file.originalname.split(".");
  fs.rename('public/configuracion/' + req.file.originalname, 'public/configuracion/favicon.' + extensionFavicon[extensionFavicon.length - 1], function (err) {
    if (err) console.log('ERROR: ' + err);
  });


  result = await client.db("Olius").collection("paginas")
    .updateOne({
      "url": 1
    }, {
      $set: {
        "favicon": "http://localhost:8888/configuracion/favicon." + extensionFavicon[extensionFavicon.length - 1]
      }
    });


  res.send({
    ok: true
  })


});



/*cambiar logo*/
router.put('/modificar/logo', upload.single('file'), async (req, res, next) => {

  if (!req.file) {
    console.log("Your request doesn’t have any file");
    return res.send({
      success: false
    });
  }

  //traer  pagina actual, la url 1
  var result = await client.db("Olius").collection("paginas")
    .findOne({
      "url": 1
    });

  //console.log(result)

  var nombreLogo = result.logotipo.split("/");

  //borrar favicon
  fs.unlink('public/configuracion/' + nombreLogo[nombreLogo.length - 1], (err) => {
    if (err) throw err;
  });


  //renombrar archivo favicon
  var extensionLogo = req.file.originalname.split(".");
  fs.rename('public/configuracion/' + req.file.originalname, 'public/configuracion/logotipo.' + extensionLogo[extensionLogo.length - 1], function (err) {
    if (err) console.log('ERROR: ' + err);
  });


  result = await client.db("Olius").collection("paginas")
    .updateOne({
      "url": 1
    }, {
      $set: {
        "logotipo": "http://localhost:8888/configuracion/logotipo." + extensionLogo[extensionLogo.length - 1]
      }
    });


  res.send({
    ok: true
  })
});


module.exports = router;
