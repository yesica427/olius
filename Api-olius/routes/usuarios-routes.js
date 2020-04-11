var express = require("express");
var router = express.Router();

//mongo db 
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useUnifiedTopology: true
});
conectarse(client).catch(console.error);
//funcion que hace la coneccion, la llamo arriba
async function conectarse(client) {

  try {
    await client.connect();

  } catch (e) {
    console.error(e);
  } finally {
    //await client.close();
  }
}




/*registro usuarios*/ //TODO:Notar async
router.post('/', async function (req, res) {
  let usuario = {
    primernombre: req.body.primernombre,
    segundonombre: req.body.segundonombre,
    primerapellido: req.body.primerapellido,
    segundoapellido: req.body.segundoapellido,
    contrasena: req.body.contrasena,
    identidad: req.body.identidad,
    correo: req.body.correo,
    rol: req.body.rol
  };

  //validar de que no exista usario con el mismo correo
  var resultado = await encontrarPorCorreo(req.body.correo);

  console.log(resultado);


  if (resultado != null) {
    //existe el usuario
    res.send({
      registroCorrecto: false,
      mensaje: "Ya existe un usuario con el mismo correo."
    })
  } else {
    var respuesta = await agregarUsuario(usuario);

    res.send({
      registroCorrecto: true,
      mensaje: "Registro correcto."
    });
  }



});


/*login*/
router.post('/login', async function (req, res) {

  //validar de que no exista usario con el mismo correo
  var resultado = await encontrarPorCorreo(req.body.correo);

  console.log(resultado);


  if (resultado != null) {
    //existe el usuario

    if (resultado.contrasena != req.body.contrasena) {
      //contrasena mala
      res.send([{
        loginCorrecto: false,
        mensaje: "Contraseña incorrecta."
      }]);
    } else {
      res.send([{
          loginCorrecto: true,
          mensaje: "LoginCorrecto"
        },
        {
          _id: resultado._id,
          primernombre: resultado.primernombre,
          segundonombre: resultado.segundonombre,
          primerapellido: resultado.primerapellido,
          segundoapellido: resultado.segundoapellido,
          correo: resultado.correo,
          rol: resultado.rol
        }
      ])
    }

  } else {
    //no existe el usuario
    res.send([{
      loginCorrecto: false,
      mensaje: "No existe el usuario con el correo dado."
    }]);
  }
});


/*obtener usuario*/
router.get('/:correo', async function (req, res) {

  var result = await client.db("Olius").collection("usuarios")
    .findOne({
      "correo": req.params.correo
    });

  //var resultadoPromesa = await result;
  if (result != null) {
    res.send(result);
  } else {
    res.send(null)
  }


})


/*obtener todos los usuarios*/
router.get('/', async function (req, res) {
  // res.send(usuarios)

  result = await client.db("Olius").collection("usuarios")
    .find({});


  res.send(await result.toArray());
})

/* Eliminar usuario*/
router.delete('/:correo', async function (req, res) {

  //se eliminara por id de usuario
  result = await client.db("Olius").collection("usuarios")
    .deleteOne({
      "correo": req.params.correo
    });
  res.send(result)
});


/**Actualizar usuario */
router.put("/:id", async function (req, res) {

  var id = ObjectID(req.params.id);

  result = await client.db("Olius").collection("usuarios")
    .updateOne({
      "_id": id
    }, {
      $set: req.body
    });

  res.send(result.result)
});

async function encontrarPorCorreo(correo) {
  var result = await client.db("Olius").collection("usuarios")
    .findOne({
      "correo": correo
      // }, {
      //   projection: {
      //     "contrasena": false
      //   }
    });

  return result;
}

async function agregarUsuario(nuevoUsuario) {
  const result = await client.db("Olius").collection("usuarios").insertOne(nuevoUsuario);

  return result.ops[0];
}


module.exports = router;
