var express=require('express');
var bodyParser=require('body-Parser');
var cors =require('cors');
var app =express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*crear usuarios*/

var usuarios=[{
    
    
}]


/*registro usuarios*/

app.post('/usuarios', function(req,res){
    let usuario=[{
       primernombre:req.body.primernombre,
        segundonombre:req.body.segundonombre,
        primerapellido:req.body.primerapellido,
        segundoapellido:req.body.segundoapellido,
        contrasena:req.body.contrasena,
        repetircontrasena:req.body.repetircontrasena,
        identidad:req.body.identidad,
        correo:req.body.correo

    }]
   usuarios.push(usuario);
   res.send({mensaje:'registro guardado existosamente',usuarioGuardado:usuario});
});



/*obtenerusuarios*/

app.get('/usuarios/:correo',function(req,res){

    for (i=0; i<usuarios.length; i++){

        if (req.params.correo == (usuarios.correo[i])){
            res.send({codigoResulatdo:1,mensaje:"usuario existe"})
        }
        
        else 
        res.send({codigoResulatdo:0,mensaje:"usuario no  existe"})

    }
   
  
    


})




/*obtener todos los usuarios*/


app.get('/usuarios',function(req,res){
    res.send(usuarios)

})





app.listen(8888,function(){
    console.log("servidor levantado");
});







