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





/*traer  comentarios de un posts*/






router.get( '/:idpost',async function (req,res){

    var idpost = ObjectID(req.params.idpost);

    
    var result = await client.db("Olius").collection("post").find({
        "_id": idpost,
      },
         
        
      );

      result.project({
          "titulopost":true,
        "_id": true,
        "usuario": true,
        "comentarios": true,
        "fecha":true
      });
    
    
      res.send(await result.toArray());
    
     
    });







/*traer todos los comentarios*/

// router.get( '/',async function (req,res){
  
//   var result = await client.db("Olius").collection("post").find({
      
//     },
       
      
//     );
    

  
//     res.send(await result.toArray());
  
   
//   });





    /*eliminar un comentario*/
    
    router.delete("/:idpost/:idcomentario", async function(req, res){
      var idpost =  ObjectID(req.params.idpost);
      var idcomentario = req.params.idcomentario;
      console.log(idpost);

      console.log(idcomentario);
      
      var result = await client.db("Olius").collection("post").updateOne({
        _id: idpost,
      }, {
        $pull: {
      
          'comentarios': {
            "idcomentario": parseInt(idcomentario)
          }
        }
      
      });
      
      res.send(result);
      
      });










module.exports = router;