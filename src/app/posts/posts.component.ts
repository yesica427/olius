import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Post } from '../post.model';
import { Categorias } from '../categorias.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private http: HttpClient, public mensajeService: MensajesService) { }

  public listaPost: Post[];
  public listaCategorias: Categorias[];

  ngOnInit() {
    this.traerCategorias();
    this.traerPost();


  }



  /*traer categorias*/

  traerCategorias() {

    this.http.get<Categorias[]>('http://localhost:8888/categorias').subscribe(
      (res) => {
        console.log(res)
        this.listaCategorias = res;
      }
    )
  }



  /*metodo de traer post*/

  traerPost() {

    this.http.get<Post[]>('http://localhost:8888/posts').subscribe(
      (res) => {
        console.log(res)
        this.listaPost = res;
        this.copiaListaPost = res;
      }
    )

  }



  eliminarPost(idpost: string) {
    this.http.delete('http://localhost:8888/posts/' + idpost).subscribe(
      (res) => {
        console.log(res)

        this.traerPost();
      }
    )




  }

  /*editar post*/

  generarShortcut(_id: string) {
    return `{"tipo":"entrada","_id":"${_id}"}`;
  }


  public postEditar: Post;
  public incluirComentarios: boolean;
  public shortcutPost: string = "";

  editarPost(post: Post) {
    this.postEditar = post;
    this.nombrePostForm.get('nombrePost').setValue(post.titulopost);
    this.contenidoEditor = post.descripcion;
    this.incluirComentarios = post.permitecomentario;

    this.shortcutPost = this.generarShortcut(post._id);

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

  @ViewChild('botonCerrar') botonCerrar: ElementRef;

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
    nuevoPost.descripcion = this.contenidoEditor;
    nuevoPost.permitecomentario = estaSeleccionado;

    console.log(nuevoPost)


    this.http.put('http://localhost:8888/posts/' + this.postEditar._id, nuevoPost).subscribe(
      async (res) => {
        console.log(res)
        this.traerPost()
        this.postEditar = null;

        this.mensajeService.mostrarMensaje(2500, "Editado exitosamente.");

        await new Promise(resolve => setTimeout(resolve, 2500));

        //cerrar modal
        this.botonCerrar.nativeElement.click();

      }
    )





    //TODO: Hacer el llamado a  la base y mandar el post


    console.log(nuevoPost);
  }



  copiaListaPost: Post[];
  categoriaSeleccionada: string;

  filtroCategoria() {

    console.log(this.categoriaSeleccionada)

    this.listaPost = this.copiaListaPost;

    if (this.categoriaSeleccionada != "null") {
      this.listaPost = this.listaPost.filter((post) => {
        return post.categoria == this.categoriaSeleccionada;
      });
    }
  }


  busquedaInput: string;

  busquedanombre() {

    console.log("llamado a busquedanombre")

    this.listaPost = this.copiaListaPost;


    if (this.busquedaInput != "") {

      this.listaPost = this.listaPost.filter((post) => {
        return post.usuario.toLocaleLowerCase().includes(this.busquedaInput.toLocaleLowerCase());
      });
    }
  }




  getDiaMes(fecha: string) {
    var date = new Date(fecha)

    var dia = ``;

    switch (date.getDay()) {
      case 0:
        dia = "Domingo"
        break;
      case 1:
        dia = "Lunes"
        break;
      case 2:
        dia = "Martes"
        break;
      case 3:
        dia = "Miércoles"
        break;
      case 4:
        dia = "Jueves"
        break;
      case 5:
        dia = "Viernes"
        break;
      case 6:
        dia = "Sábado"
        break;
    }

    var fechaNumero = date.getDate();

    var mes = '';

    switch (date.getMonth()) {
      case 0:
        mes = "Enero"
        break;
      case 1:
        mes = "Febrero"
        break;
      case 2:
        mes = "Marzo"
        break;
      case 3:
        mes = "Abril"
        break;
      case 4:
        mes = "Mayo"
        break;
      case 5:
        mes = "Junio"
        break;
      case 6:
        mes = "Julio"
        break;
      case 7:
        mes = "Agosto"
        break;
      case 8:
        mes = "Septiembre"
        break;
      case 9:
        mes = "Octubre"
        break;
      case 10:
        mes = "Noviembre"
        break;
      case 11:
        mes = "Diciembre"
        break;

    }


    return dia + " " + fechaNumero + " de " + mes;
  }

}
