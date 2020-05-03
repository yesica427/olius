const path = require('path');
const multer = require('multer');
var express = require("express");
var router = express.Router();
const fs = require('fs');


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


/*crear archivos*/

//directiorio donde se guardan los archivos subidos
const DIR = './public';


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


router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.post('/', upload.single('file'), async function (req, res) {


  if (!req.file) {
    console.log("Your request doesn’t have any file");
    return res.send({
      success: false
    });

  } else {



    // renombrar el archivo con el titulo 

    //sacar la extension del archivo
    var nombres = req.body.nombre.split(".");

    var nuevoNombreArchivo = req.body.titulo + "." + nombres[1];

    fs.rename('./public/' + req.body.nombre, './public/' + nuevoNombreArchivo, function (err) {
      if (err) {
        res.send({
          success: false
        })
      }

    });

    var tipo = "";

    switch (req.body.tipo) {
      case "image/jpeg":
        tipo = "imagen"
        break;

      case "image/png":
        tipo = "imagen"
        break;

      case "video/mp4":
        tipo = "video";
        break;

      case "video/webm":
        tipo = "video";
        break;

      case "application/pdf":
        tipo = "documento";
        break;
      case "audio/mpeg":
        tipo = "audio"
        break;

    }

    var nuevoArchivo = {
      titulo: req.body.titulo,
      //nombrearchivo: req.body.nombre,
      nombrearchivo: nuevoNombreArchivo,
      url: "http://localhost:8888/" + nuevoNombreArchivo,
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      tipo: tipo
    }


    const result = await client.db("Olius").collection("archivos").insertOne(nuevoArchivo);

    console.log('Your file has been received successfully');
    return res.send({
      success: true,
      objeto: result.ops[0]
    })
  }
});



/* obtener archivos*/


router.get('/', async function (req, res) {

  var result = await client.db("Olius").collection("archivos")
    .find({});


  res.send(await result.toArray());
});




/*obtener un archivo*/
router.get('/:id', async function (req, res) {


  var id = ObjectID(req.params.id);

  var result = await client.db("Olius").collection("archivos")
    .findOne({
      "_id": id
    });

  res.send(result);


})




/*editar un archivo*/
router.put('/:id', async function (req, res) {


  var id = ObjectID(req.params.id);


  var archivo = await client.db("Olius").collection("archivos")
    .findOne({
      "_id": id
    });

  var nombres = archivo.nombrearchivo.split(".");

  var nuevoNombreArchivo = req.body.titulo + "." + nombres[1];

  fs.rename('./public/' + archivo.nombrearchivo, './public/' + nuevoNombreArchivo, function (err) {
    if (err) {
      res.send({
        success: false
      })
    }

  });

  var archivoEditar = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    nombrearchivo: nuevoNombreArchivo,
    url: "http://localhost:8888/" + nuevoNombreArchivo
  }

  result = await client.db("Olius").collection("archivos")
    .updateOne({
      "_id": id
    }, {
      $set: archivoEditar //req.body
    });

  res.send(result.result)





})




/* eliminar*/


//recibe dos parametros url, el id de mongo y el nombre del archivo
router.delete('/:id/:nombrearchivo', async function (req, res) {
  var id = ObjectID(req.params.id);

  //eliminar el archivo de la carpeta public
  fs.unlink('./public/' + req.params.nombrearchivo, async (err) => {
    if (err) throw err;


    //si no hay error, borrar la data de mongo
    result = await client.db("Olius").collection("archivos")
      .deleteOne({
        "_id": id
      }, {
        $set: req.body
      });

    res.send(result.result)
  });


})



















module.exports = router;
