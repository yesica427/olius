var express = require("express");
var router = express.Router();



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


/*crear pagina*/
router.post('/', async function (req, res) {

  const result = await client.db("Olius").collection("paginas").insertOne(req.body);

  res.send(result.ops[0]);

})



/*obtener una pagina*/

router.get('/:url', async function (req, res) {

  var url = +req.params.url;

  var result = await client.db("Olius").collection("paginas")
    .findOne({
      "url": url
    });

  res.send(result);
})




/*obtener todas las paginas*/

router.get('/', async function (req, res) {

  var result = await client.db("Olius").collection("paginas")
    .find({});


  res.send(await result.toArray());
});


/* obtener la cuenta de documentos en la coleccion*/


router.get('/cuenta/documentos', async function (req, res) {

  console.log("Cae en cuenta")

  var cuenta = await client.db("Olius").collection("paginas")
    .countDocuments({});


  console.log(cuenta);

  res.send({
    "res": cuenta
  });


});


/* Obtener la url y nombre de la pagina*/
router.get('/get/links', async function (req, res) {


  var result = await client.db("Olius").collection("paginas")
    .find({});

  //retorna solo los campos que coloco aca
  result.project({
    "_id": 1,
    "titulomenu": 1,
    "url": 1
  });


  res.send(await result.toArray());

});


/*editar pagina*/
router.put('/:id', async function (req, res) {

  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("paginas")
    .updateOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)





})


/*delete pagina*/

router.delete('/:id', async function (req, res) {
  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("paginas")
    .deleteOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)
})



module.exports = router;
