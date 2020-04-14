var express = require("express");
var router = express.Router();




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





router.post('/',  async function (req, res) {

    const result = await client.db("Olius").collection("archivos").insertOne(req.body);

   res.send(result.ops[0]);


})




/* obtener archivos*/


router.get('/', async function (req, res) {

    var result = await client.db("Olius").collection("archivos")
       .find({});
  
  
     res.send(await result.toArray());
   });




/*obtener un archivo*/

router.get('/:id', async function(req,res){


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
  
   result = await client.db("Olius").collection("archivos")
     .updateOne({
       "_id": id
     }, {
       $set: req.body
     });
  
  res.send(result.result)
  
  
  
  
  
  })
  



/* eliminar*/

router.delete('/:id', async function (req, res) {
    var id = ObjectID(req.params.id);

    result = await client.db("Olius").collection("archivos")
      .deleteOne({
        "_id": id
      }, {
        $set: req.body
      });
  
    res.send(result.result)




  }
 )


 
















module.exports=router;