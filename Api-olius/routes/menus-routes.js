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


/*crear menu*/

router.post('/', async function (req, res) {

  const result = await client.db("Olius").collection("menu").insertOne(req.body);

  res.send(result.ops[0]);


})



/*obtener un menu*/


router.get('/:id', async function (req, res) {


  var id = ObjectID(req.params.id);

  var result = await client.db("Olius").collection("menu")
    .findOne({
      "_id": id
    });

  res.send(result);


})


/*obtener todos los menus*/

router.get('/', async function (req, res) {

  var result = await client.db("Olius").collection("menu")
    .find({});


  res.send(await result.toArray());
});

/*editar menu*/

router.put('/:id', async function (req, res) {

  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("menu")
    .updateOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)

})


// /*delete menu*/

router.delete('/:id', async function (req, res) {
  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("menu")
    .deleteOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)

})


module.exports = router;
