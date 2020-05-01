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


/*crear post*/





router.post('/', async function (req, res) {

  const result = await client.db("Olius").collection("post").insertOne(req.body);

  res.send(result.ops[0]);


})



/*obtener un post*/


router.get('/:id', async function (req, res) {


  var id = ObjectID(req.params.id);

  var result = await client.db("Olius").collection("post")
    .findOne({
      "_id": id
    });

  res.send(result);


})

/*obtener un post por categoria*/
router.get('/porcategoria/:categoria', async function (req, res) {

  var categoria = req.params.categoria;

  var result = await client.db("Olius").collection("post")
    .find({
      "categoria": categoria
    });

  res.send(await result.toArray());
})




/*obtener todos post*/

router.get('/', async function (req, res) {

  var result = await client.db("Olius").collection("post")
    .find({});


  res.send(await result.toArray());
});

/*editar post*/

router.put('/:id', async function (req, res) {

  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("post")
    .updateOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)





})


// /*delete post*/


router.delete('/:id', async function (req, res) {
  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("post")
    .deleteOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)




})


//anadir comentario
router.post("/comentarios/:idpost", async function (req, res) {

  var idpost = ObjectID(req.params.idpost);

  var result = await client.db("Olius").collection("post").updateOne({
    "_id": idpost,
  }, {
    "$push": {
      "comentarios": req.body
    }
  });

  res.send(result);
})

// //eliminar comentarios
// router.delete("/comentarios/:idpost", async function (req, res) {

//   var idpost = ObjectID(req.params.idpost);

//   var result = await client.db("Olius").collection("post").updateOne({
//     _id: idpost
//   }, {
//     $pull: {
//       'comentarios': {
//         "idcomentario": req.body.idcomentario
//       }
//     }
//   });

//   res.send(result);
// })


module.exports = router;
