var express = require("express");
var router = express.Router();
const multer = require('multer');
const path = require("path");


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

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//directiorio donde se guardan los archivos subidos

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'public/fotostemas')
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
})


/*crear tema*/
router.post('/', upload.array('files'), async (req, res, next) => {

  const files = req.files;

  console.log(req.body);

  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }

  var fotosURL = [];

  for (let i = 0; i < req.files.length; i++) {
    fotosURL.push("http://localhost:8888/fotostemas/" + req.files[i].originalname);
  }



  //guardar la metadata en la base 
  var nuevoTema = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    css: req.body.css,
    js: req.body.js,
    usuario: req.body.usuario,
    fotos: fotosURL
  }

  console.log(nuevoTema);

  const result = await client.db("Olius").collection("temas").insertOne(nuevoTema);

  console.log(result.ops[0])
  //res.send(result.ops[0]);

  res.send({
    result: 'ok'
  });
})


/*obtener un tema*/


router.get('/:id', async function (req, res) {


  var id = ObjectID(req.params.id);

  var result = await client.db("Olius").collection("temas")
    .findOne({
      "_id": id
    });

  res.send(result);


})


/*obtener todos los temas*/

router.get('/', async function (req, res) {

  var result = await client.db("Olius").collection("temas")
    .find({});


  res.send(await result.toArray());
});


/*editar tema*/
router.put('/:id', async function (req, res) {

  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("temas")
    .updateOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)

})


// /*delete tema*/

router.delete('/:id', async function (req, res) {
  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("temas")
    .deleteOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)


})





module.exports = router;
