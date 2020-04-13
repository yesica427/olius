import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import { HttpClient } from '@angular/common/http';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public listaPost:Post[];

  ngOnInit() {

    this.traerPost();
  }

/*metodo de traer post*/

traerPost(){

  this.http.get<Post[]>('http://localhost:8888/posts').subscribe(
    (res)=>{console.log(res)
    this.listaPost=res;
    }
  )

}



eliminarPost(idpost:string){
  this.http.delete('http://localhost:8888/posts/'+idpost).subscribe(
    (res)=>{console.log(res)

      this.traerPost();
    }
  )



  
}

/*editar post*/

public listaDeCategorias = [
  { value: 1, nombre: "Deportes" },
  { value: 2, nombre: "Musica" },
  { value: 3, nombre: "Arte" },
  { value: 4, nombre: "Viajes" },
];

public postEditar:Post;


editarPost(post:Post){
  this.postEditar=post;
  this.nombrePostForm.get('nombrePost').setValue(post.titulopost);
  this.contenidoEditor=post.descripcion;
  

}


nombrePostForm = new FormGroup({
  nombrePost: new FormControl("", [
    Validators.required,
    Validators.minLength(5),
  ]),
});

get nombrePost() {
  return this.nombrePostForm.get("nombrePost");
}

//opciones para el editor froala
public options: Object = {
  placeholderText: "Escriba algo aquí.",
  charCounterCount: false,
};

//aqui se guarda el contenido del editor
public contenidoEditor: string = "Escriba una Descripcion de su post";

//validar que sea mayor que 2
validarContenidoEditor() {
  return this.contenidoEditor.length > 2;
}

guardarPost() {
  //aqui guardo el option seleccionado en categorias
  var valorCategoria = (<HTMLSelectElement>(
    document.getElementById("select-categorias")
  )).value;

  //titulo del post, valor traido del formulario de nombre post
  var tituloPost = this.nombrePostForm.value.nombrePost;

  //verificar si quiere comentarios
  var element = <HTMLInputElement>document.getElementById("comentarios");
  var estaSeleccionado = element.checked;

  var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

  var nombreUsuario =
    usuarioActual.primernombre + " "+ usuarioActual.primerapellido;

  var nuevoPost = new Post();
  nuevoPost.titulopost = tituloPost;
  nuevoPost.categoria = valorCategoria;
  nuevoPost.fecha = new Date();
  nuevoPost.descripcion = this.contenidoEditor;
  nuevoPost.permitecomentario = estaSeleccionado;
  nuevoPost.comentarios = [];
  nuevoPost.usuario = nombreUsuario;
  


  this.http.put('http://localhost:8888/posts/'+ this.postEditar._id ,nuevoPost).subscribe(
    (res)=>{console.log(res)
    this.traerPost() 
  this.postEditar=null}
  )



  

  //TODO: Hacer el llamado a  la base y mandar el post


  console.log(nuevoPost);
}



}
