import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from "../post.model";
import { HttpClient } from "@angular/common/http";
import { Categorias } from '../categorias.model';
import { Router } from '@angular/router';

@Component({
  selector: "app-nuevo-post",
  templateUrl: "./nuevo-post.component.html",
  styleUrls: ["./nuevo-post.component.css"],
})
export class NuevoPostComponent implements OnInit {


  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.traerCategorias();
  }

  //formulario reactivo para el nombre del post
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


  //traer categorias
  listaCategorias: Categorias[];
  traerCategorias() {

    this.http.get<Categorias[]>("http://localhost:8888/categorias").subscribe((res) => {
      this.listaCategorias = res;

      console.log(res);
    })
  }

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
      usuarioActual.primernombre + " " + usuarioActual.primerapellido;

    var nuevoPost = new Post();
    nuevoPost.titulopost = tituloPost;
    nuevoPost.categoria = valorCategoria;
    nuevoPost.fecha = new Date();
    nuevoPost.descripcion = this.contenidoEditor;
    nuevoPost.permitecomentario = estaSeleccionado;
    nuevoPost.comentarios = [];
    nuevoPost.usuario = nombreUsuario;



    this.http.post('http://localhost:8888/posts', nuevoPost).subscribe(
      (res) => { console.log(res); this.router.navigateByUrl('/admin/posts'); }
    )





    //TODO: Hacer el llamado a  la base y mandar el post


    console.log(nuevoPost);
  }
}
